import { useRecoilValueLoadable } from "recoil"
import { AutoCompleteForm } from "./AutoCompleteForm"

interface IGetAutoCompleteForm {
    label: string,
    name: string,
    control: any,
    selector: any,
    listaFixa?: any
    optionLabel: string,
    nameArray?: string,
    readonly?: boolean,
    error?: any
}

export const GetAutoCompleteForm = (props: IGetAutoCompleteForm) => {

    const { state, contents } = useRecoilValueLoadable<any>(props.selector)

    switch (state) {
        case "hasValue":
            return (
                <AutoCompleteForm label={props.label} name={props.name} control={props.control} options={props.nameArray === null || props.nameArray === undefined ? contents : contents[props.nameArray]} optionLabel={props.optionLabel} readOnly={props.readonly} error={props.error} />
            )

        case "hasError":
            return (
                <AutoCompleteForm label={props.label} name={props.name} control={props.control} options={[]} optionLabel={props.optionLabel}  error={props.error} />
            )

        case "loading":
            return (
                <AutoCompleteForm label={props.label} name={props.name} control={props.control} options={[]} optionLabel={props.optionLabel}  error={props.error} />
            )
    }
}