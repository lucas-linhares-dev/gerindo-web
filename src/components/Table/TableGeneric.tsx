import { Box, Toolbar, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableSortLabel, IconButton, TextField, Grid } from '@mui/material';
import { RecoilRoot, useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { Fragment, useEffect, useRef, useState } from 'react';
import { visuallyHidden } from '@mui/utils';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ButtonGeneric } from '../Button/ButtonGeneric';
import { Scrollbars } from "react-custom-scrollbars";
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


let rowSelected: HTMLElement | null = null
let lastRowSelected: HTMLElement | null = null   // PARA LÓGICA DE ROW SELECTED COLORIDO

type Order = 'asc' | 'desc';

interface ModulosInterface {
    id: number;
    descricao: string;
}

interface HeaderColumnCell {
    disablePadding: boolean;
    field: any;
    subField?: any;
    label: string;
    align?: any;
    enableOrder: boolean;
    customBodyRender?: any;
}

interface ITableGeneric {
    title?: any;
    atomFilter: any;
    atomSelectorList: any;
    atomPage: any;
    atomRowPerPage: any;
    columns: readonly HeaderColumnCell[];
    widthTxtField: string;
    tabela: string;
    reload?: any | null;
    setReload?: any | null;
    enableSearch: boolean;
    enablePagination: boolean;
    height: any;
    heightScroll?: any,
    objFilters?: any,
    enableCustomSearch?: any
    setItemEdit?: any;
    itemEdit?: any
    setCardPesquisa: any
}

export default function TableGeneric(props: ITableGeneric) {

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof ModulosInterface>('id');
    const [tamanhoLista, setTamanhoLista] = useState(0)
    const heightScrollBar = props.heightScroll ? props.heightScroll : '100px'

    const navigate = useNavigate()

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof ModulosInterface,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#006666' }}>
            <RecoilRoot>
                <TableToolBarGeneric setItemEdit={props.setItemEdit} setCardPesquisa={props.setCardPesquisa} setReload={props.setReload} enableCustomSearch={props.enableCustomSearch} objFilters={props.objFilters} widthTxtField={props.widthTxtField} title={props.title} atomPage={props.atomPage} atomFilter={props.atomFilter} enableSearch={props.enableSearch} />
                <TableContainer sx={{ height: props.height }}>
                    <Scrollbars renderThumbVertical={({ style, ...props }) =>
                            <Box {...props}
                                style={{
                                    ...style,
                                    backgroundColor: '#f5f5f5',
                                    width: '6px',
                                    marginTop: '55px',
                                    maxHeight: heightScrollBar,
                                    opacity: '0.6',
                                    borderRadius: '50px',
                                }} />

                        }>
                    <Table size={"small"} stickyHeader>
                        <TableHeaderGeneric
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            columns={props.columns}
                        />
                        <TableContainerGeneric itemEdit={props.itemEdit} reload={props.reload} setReload={props.setReload} tabela={props.tabela} setItemEdit={props.setItemEdit} atomFilter={props.atomFilter} atomSelectorList={props.atomSelectorList} columns={props.columns} order={order} orderBy={orderBy} navigate={navigate} atomRowsPerPage={props.atomRowPerPage} setTamanhoLista={setTamanhoLista} />
                    </Table>
                    </Scrollbars>
                </TableContainer>
                {/* {props.enablePagination &&
                    <RecoilRoot override={false}>
                        <TablePaginationGeneric atomRowsPerPage={props.atomRowPerPage} atomPage={props.atomPage} tamanhoLista={tamanhoLista} />
                    </RecoilRoot>
                } */}
            </RecoilRoot>
        </Paper>
    );
}

interface ITableContainerGeneric {
    atomFilter: any;
    atomSelectorList: any;
    atomRowsPerPage: any;
    columns: any;
    order: any;
    orderBy: any;
    setTamanhoLista: any
    navigate: NavigateFunction;
    setItemEdit: any;
    tabela: string;
    reload?: any | null;
    setReload?: any | null;
    itemEdit: any;
}

function TableContainerGeneric(props: ITableContainerGeneric) {

    const { state, contents } = useRecoilValueLoadable<any>(props.atomSelectorList)

    const rowsPerPage = useRecoilValue<any>(props.atomRowsPerPage);
    let emptyRows = 0

    const refresh = useRecoilRefresher_UNSTABLE(props.atomSelectorList);

    useEffect(() => {
        if (props.reload === true) {
            refresh()
            props.setReload(false)
        }
        // switch (state) {
        //     case "hasValue":
        //         props.setTamanhoLista(contents['tamanhoLista']);
        //         break
        // }
    }, [props.reload])


    switch (state) {
        case "hasValue":
            if (contents[props.tabela] !== null && contents[props.tabela] !== undefined) {
                if (contents[props.tabela].length > 0) {
                    emptyRows = rowsPerPage - parseInt(contents[props.tabela].length)
                }
            }
            return (
                <TableBody>
                    {(contents[props.tabela].length === 0) &&
                        <TableRow

                        >
                            <TableCell align='center' colSpan={props.columns.length} sx={{ paddingTop: '10em', border: '1px solid transparent' }}><Typography variant='h6' sx={{ fontWeight: 'bold', fontFamily: 'Kanit, sans-serif;', color: '#f5f5f5' }}>Sua consulta não retornou nenhum registro</Typography></TableCell>
                        </TableRow>
                    }
                    {stableSort(contents[props.tabela], getComparator(props.order, props.orderBy))
                        .map((row, index) => {
                            return (<Fragment key={index}><TableRowGeneric itemEdit={props.itemEdit} setItemEdit={props.setItemEdit} columns={props.columns} row={row} /></Fragment>
                            );
                        })}
                    {emptyRows > 0 && (
                        <TableRow
                            style={{
                                height: (52) * emptyRows,
                            }}
                        >
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            )
        case "loading":
            return (
                <TableBody>
                    <TableRow
                    >
                        <TableCell align='center' colSpan={props.columns.length} sx={{ paddingTop: '10em', border: '1px solid transparent' }}><Typography variant='h6' sx={{ fontWeight: 'bold', fontFamily: 'Kanit, sans-serif;', color: '#f5f5f5' }}>Buscando...</Typography></TableCell>
                    </TableRow>
                </TableBody>
            )

        case "hasError":
            return null
    }

}

interface ITablePaginationGeneric {
    atomRowsPerPage: any;
    atomPage: any;
    tamanhoLista: any;
}

function TablePaginationGeneric(props: ITablePaginationGeneric) {

    const [page, setPage] = useRecoilState<any>(props.atomPage);
    const [rowsPerPage, setRowsPerPage] = useRecoilState<any>(props.atomRowsPerPage);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.tamanhoLista}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage={'Itens por pagina:'}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
                ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
                    fontWeight: "bold",
                    color: "green",
                    marginTop: '0.8rem',
                },
                ".MuiTablePagination-displayedRows": {
                    marginTop: '1rem',
                    fontWeight: 'bold'
                },
                ".MuiTablePagination-selectLabel, .MuiTablePagination-input, .MuiSelect-select": {
                    fontWeight: 'bold'
                }
            }}
        />
    )
}

interface TableHeaderProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ModulosInterface) => void;
    order: Order;
    orderBy: string;
    columns: readonly HeaderColumnCell[];
}

function TableHeaderGeneric(props: TableHeaderProps) {

    const { order, orderBy, onRequestSort } = props;

    const createSortHandler =
        (property: keyof ModulosInterface) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {props.columns.map((headCell, index) => (
                    <TableCell
                        sx={{ fontSize: '20px', border: 'none' ,fontWeight: '1000', fontFamily: 'Kanit, sans-serif;' ,backgroundColor: '#f5f5f5', paddingTop: '15px', paddingBottom: '15px', color: '#006666', whiteSpace: 'nowrap', }}
                        key={index}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.field ? order : false}
                    >
                        {headCell.enableOrder === true ? <TableSortLabel
                            sx={{
                                '& .MuiTableSortLabel-icon': {
                                    color: '#006666',
                                },
                                '&.MuiTableSortLabel-root': {
                                    color: '#006666',
                                },
                                '&:hover': { color: 'black' }
                            }}
                            active={orderBy === headCell.field}
                            direction={orderBy === headCell.field ? order : 'asc'}
                            onClick={createSortHandler(headCell.field)}>
                            {headCell.label}
                            {orderBy === headCell.field ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                            :
                            <TableSortLabel>{headCell.label}</TableSortLabel>
                        }
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


interface ITableToolBarGeneric {
    atomPage: any;
    atomFilter: any;
    title: any;
    widthTxtField: string;
    enableSearch: boolean,
    enableCustomSearch: boolean,
    objFilters: any,
    setReload?: any,
    setCardPesquisa: any
    setItemEdit: any;
}


function TableToolBarGeneric(props: ITableToolBarGeneric) {

    const [search, setSearch] = useState(true)
    const setPage = useSetRecoilState(props.atomPage);
    const setValorSearch = useSetRecoilState(props.atomFilter);

    const txtFieldSearch = useRef<HTMLInputElement | null>(null)

    const onClickSearch = () => {
        setSearch(true)
        txtFieldSearch.current?.focus()
    }


    if (props.enableSearch === true) {
        return (
            <Toolbar>
                <Box sx={{ width: '100%', textAlign: 'left', margin: 1, marginRight: 0 }}>
                    <TextField
                        sx={{
                            width: 400,
                            marginTop: 1, marginBottom: 1,
                            '& label.Mui-focused': {
                                color: '#f5f5f5',
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: '#f5f5f5',
                                borderWidth: 1

                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#f5f5f5',
                                    borderWidth: 1,
                                },
                                '&:hover fieldset': {
                                    borderColor: '#f5f5f5',
                                    borderWidth: 1

                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#f5f5f5',
                                    borderWidth: 1

                                },
                            }
                        }}
                        inputProps={{style: {color: '#f5f5f5'}}}
                        InputLabelProps={{style: {color: "#f5f5f5",}}}
                        id="txtSearch"
                        placeholder='Pesquisar'
                        ref={txtFieldSearch}
                        label={<SearchIcon sx={{ fontSize: 28 }} />}
                        variant="outlined"
                        onChange={(event: any) => {
                            setValorSearch(event.target.value)
                            // setPage(0)
                            props.setReload(true)
                        }} />
                </Box>
                <Box>
                    <IconButton aria-label="search" sx={{ color: '#f5f5f5', marginTop: 0, }} onClick={() => { props.setCardPesquisa(false) ; props.setItemEdit(null) }}>
                        <ArrowUpwardIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                </Box>

            </Toolbar>
        )
    }

    else {
        if (props.enableCustomSearch === true) {
            return (
                <Toolbar>
                    <Typography
                        sx={{
                            marginRight: '5px',
                            flex: '1 1 100%',
                            fontSize: 24,
                            color: "#2B7C41",
                            fontWeight: 'bold',
                        }}
                        id="tableTitle"
                        color="text.secondary"
                        gutterBottom
                    >
                        {props.title}
                    </Typography>
                    <Box>
                        <ButtonGeneric marginRight='0px' title="Filtrar" type="button" onClick={() => { setValorSearch(props.objFilters); props.setReload(true) }} typeIcon={'filtrar'} />
                    </Box>
                </Toolbar>
            )
        }
        else {
            return (
                <Toolbar>
                    <Typography
                        sx={{
                            marginRight: '5px',
                            flex: '1 1 100%',
                            fontSize: 24,
                            color: "#2B7C41",
                            fontWeight: 'bold',
                        }}
                        id="tableTitle"
                        color="text.secondary"
                        gutterBottom
                    >
                        {props.title}
                    </Typography>
                </Toolbar>
            )
        }
    }
}


interface ITableRowGeneric {
    row: any;
    columns: any;
    setItemEdit: any;
    itemEdit: any;
}

function TableRowGeneric(props: ITableRowGeneric) {

    const onClickItemEdit = () => {
        if (props.itemEdit !== null && props.itemEdit !== undefined && props.row._id === props.itemEdit._id) {
            props.setItemEdit(null)
            rowSelected = document.getElementById(props.row._id)
            rowSelected!.style.cssText = 'background-color: transparent'
        }
        else {
            props.setItemEdit(props.row)

            if (rowSelected !== null) {
                lastRowSelected = rowSelected
                lastRowSelected!.style.cssText = 'background-color: transparent'
            }
            rowSelected = document.getElementById(props.row._id)
            rowSelected!.style.cssText = 'background-color: #008584'
        }
    }

    return (
        <TableRow
            hover
            id={props.row._id}
            className='table-row'
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            {props.columns.map((column: any, index: any) => {
                if (column.itemSelected !== undefined && column.itemSelected !== null && props.itemEdit !== null && props.itemEdit !== undefined && props.row._id === props.itemEdit._id) {
                    return (<TableCell sx={{ height: '60px', '&.MuiTableCell-root': { fontSize: '1.1rem', color: '#f5f5f5', fontFamily: 'Kanit, sans-serif;' }, }} style={{ whiteSpace: 'nowrap' }} key={index} width={column.width} align={column.align} scope='row' padding={column.disablePadding ? 'none' : 'normal'} onClick={onClickItemEdit}>{column.itemSelected}</TableCell>)
                }
                if (column.itemSelected !== undefined && (props.itemEdit === null || props.itemEdit === undefined || props.row._id !== props.itemEdit._id)) {
                    return (<TableCell sx={{ height: '60px', '&.MuiTableCell-root': { fontSize: '1.1rem', color: '#f5f5f5', fontFamily: 'Kanit, sans-serif;' }, }} style={{ whiteSpace: 'nowrap' }} key={index} width={column.width} align={column.align} scope='row' padding={column.disablePadding ? 'none' : 'normal'} onClick={onClickItemEdit}>{column.itemNoSelected}</TableCell>)
                }
                if (props.row[column.field] !== null && props.row[column.field] !== undefined) {
                    if (column.subField !== null && column.subField !== undefined) {
                        return (<TableCell sx={{ height: '60px', '&.MuiTableCell-root': { fontSize: '1.1rem', color: '#f5f5f5', fontFamily: 'Kanit, sans-serif;' } }} style={{ whiteSpace: 'nowrap' }} key={index} width={column.width} align={column.align} scope='row' padding={column.disablePadding ? 'none' : 'normal'}>{props.row[column.field][column.subField]}</TableCell>)
                    } else {
                        return (<TableCell sx={{ height: '60px', '&.MuiTableCell-root': { fontSize: '1.1rem', color: '#f5f5f5', fontFamily: 'Kanit, sans-serif;' } }} style={{ whiteSpace: 'nowrap' }} key={index} width={column.width} align={column.align} scope='row' padding={column.disablePadding ? 'none' : 'normal'}>{props.row[column.field]}</TableCell>)
                    }
                } else {
                    return (<TableCell sx={{ height: '60px', '&.MuiTableCell-root': { fontSize: '1.1rem', color: '#f5f5f5', fontFamily: 'Kanit, sans-serif;' } }} style={{ whiteSpace: 'nowrap' }} key={index} width={column.width} align={column.align} scope='row' padding={column.disablePadding ? 'none' : 'normal'}></TableCell>)
                }

            })}

        </TableRow>
    )
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
