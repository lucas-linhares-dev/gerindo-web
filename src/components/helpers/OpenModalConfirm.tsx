import Swal from "sweetalert2"

 export function OpenModalConfirm(title: string) {
    
    return Swal.fire({
        title: title,
        text: '',
        icon: 'warning',
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
        confirmButtonColor: 'green',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
          return true
        }
        else{
          return false
        }

    })
}