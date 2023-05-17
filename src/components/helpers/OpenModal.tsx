
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export function OpenModal(title: string, action: any) {

    const MySwal = withReactContent(Swal)
    
    return MySwal.fire({
        position: 'center',
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 3000
    }).then(() => {
        action()
    })
}