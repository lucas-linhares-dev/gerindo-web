import { Autocomplete, autocompleteClasses, ListSubheader, Popper, styled, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";
import { ListChildComponentProps, VariableSizeList } from "react-window";

interface IAutoCompleteForm {
    name: string,
    control: any,
    label: string,
    readOnly?: boolean,
    options: any,
    optionLabel: any,
    groupBy?: any,
    groupByField?: any,
    error?: string,
    setarIdOnChange?:boolean
}

export const AutoCompleteForm = (props: IAutoCompleteForm) => {

    const LISTBOX_PADDING = 8;

    function renderRow(props: ListChildComponentProps) {
        const { data, index, style } = props;
        const dataSet = data[index];
        const inlineStyle = {
            ...style,
            top: (style.top as number) + LISTBOX_PADDING,
        };

        if (dataSet.hasOwnProperty('group')) {
            return (
                <ListSubheader key={dataSet.key} component="div" style={inlineStyle} sx={{fontFamily: "Kanit, sans-serif", fontWeight: 'bold'}}>
                    {dataSet.group}
                </ListSubheader>
            );
        }

        return (
            <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle} sx={{fontFamily: "Kanit, sans-serif", fontWeight: 'bold'}}>
                {dataSet[0].key}
                {/* {dataSet[1]} */}
            </Typography>
        );
    }

    const OuterElementContext = React.createContext({});

    const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
        const outerProps = React.useContext(OuterElementContext);
        return <div ref={ref} {...props} {...outerProps} />;
    });

    function useResetCache(data: any) {
        const ref = React.useRef<VariableSizeList>(null);
        React.useEffect(() => {
            if (ref.current != null) {
                ref.current.resetAfterIndex(0, true);
            }
        }, [data]);
        return ref;
    }

    // Adapter for react-window
    const ListboxComponent = forwardRef<
        HTMLDivElement,
        React.HTMLAttributes<HTMLElement>
    >(function ListboxComponent(props, ref) {
        const { children, ...other } = props;
        const itemData: any[] = [];
        (children as any[]).forEach(
            (item: any & { children?: any[] }) => {
                itemData.push(item);
                itemData.push(...(item.children || []));
            },
        );

        const theme = useTheme();
        const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
            noSsr: true,
        });
        const itemCount = itemData.length;
        const itemSize = smUp ? 36 : 48;

        const getChildSize = (child: React.ReactChild) => {
            if (child.hasOwnProperty('group')) {
                return 48;
            }

            return itemSize;
        };

        const getHeight = () => {
            if (itemCount > 8) {
                return 8 * itemSize;
            }
            return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
        };

        const gridRef = useResetCache(itemCount);

        return (
            <div ref={ref}>
                <OuterElementContext.Provider value={other}>
                    <VariableSizeList
                        itemData={itemData}
                        height={getHeight() + 2 * LISTBOX_PADDING}
                        width="100%"
                        ref={gridRef}
                        outerElementType={OuterElementType}
                        innerElementType="ul"
                        itemSize={(index) => getChildSize(itemData[index])}
                        overscanCount={5}
                        itemCount={itemCount}
                    >
                        {renderRow}
                    </VariableSizeList>
                </OuterElementContext.Provider>
            </div>
        );
    });

    const StyledPopper = styled(Popper)({
        [`& .${autocompleteClasses.listbox}`]: {
            boxSizing: 'border-box',
            '& ul': {
                padding: 0,
                margin: 0,
            },
        },
    });

    function getIsOptionEqualToValue(option:any,value:any){
        if (typeof value === "string" || value instanceof String){
            return option._id === value
        }
        return option._id === value._id
    }

    function getOptionLabel(options:any){
        if (typeof options === "string" || options instanceof String){
            let obj = props.options.filter((opt: any) =>opt._id === options)[0]
            if(obj !== undefined){
                return `${obj[props.optionLabel]}`
            }
            else{
                return ''
            }
        }else{
            return `${options[props.optionLabel]}`
        }
    }

    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field: { onChange, value } }) => (
                <>
                    <Autocomplete
                        id={props.label}
                        value={value || null}
                        onChange={(evt: any, value: any) => {
                            if(value === null){
                                onChange(null)
                            }else
                            if (props.setarIdOnChange === true){
                                onChange(value._id)
                            }else{
                                onChange(value)
                            }
                        }}
                        disableListWrap
                        PopperComponent={StyledPopper}
                        ListboxComponent={ListboxComponent}
                        disabled={props.readOnly ? true : false}
                        options={props.options}
                        groupBy={props.groupBy === true ? (option: any) => option[props.groupByField] : undefined}
                        getOptionLabel={(options: any) => getOptionLabel(options)}
                        isOptionEqualToValue={(option: any) => getIsOptionEqualToValue(option,value)}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label={props.label}
                                InputProps={{ ...params.InputProps, style: { textAlign: 'left', fontFamily: "Kanit, sans-serif", fontWeight: 'bold' } }}
                        InputLabelProps={{ style: { color: props.error ? "#df2320" : "#008584", fontSize: '1.2rem', fontFamily: "Kanit, sans-serif", fontWeight: 'bold' } }} 
                        sx={{
                            width: 1,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: props.error ? "#e20400" : "#008584",
                                    borderWidth:  1,
                                    fontSize: '1.16rem',
                                },
                                '&:hover fieldset': {
                                    borderColor: props.error ? "#e20400" : "#008584",
                                    
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: props.error ? "#e20400" : "#008584",
                                },
                            },
                            '& input[type=number]': {
                                'MozAppearance': 'textfield'
                            },
                            '& input[type=number]::-webkit-outer-spin-button': {
                                'WebkitAppearance': 'none',
                                margin: 0
                            },
                            '& input[type=number]::-webkit-inner-spin-button': {
                                'WebkitAppearance': 'none',
                                margin: 0
                            }
                        }} />
                        }
                        renderOption={(props, option: any, state) =>
                            [props, option?.nome, state.index] as React.ReactNode
                        }
                        renderGroup={(params) => params as unknown as React.ReactNode} />
                    {props.error ? (
                        <div className="error" style={{ color: "#e4605e", fontWeight: 'bold', fontSize: '0.8em' }}>{props.error}</div>
                    ) : null}
                </>
            )}
        />
    )       
}