import Swal from "sweetalert2";

export const alerts = {
    info: (title = 'Info', message) => {
        return Swal.fire({
            title: title,
            text: message,
            confirmButtonColor: '#68b06a',
        });
    },
    question: (title, message = '', textConfirm = 'Ok') => {
        return Swal.fire({
            title: title,
            text: message,
            confirmButtonColor: '#de0100',
            cancelButtonColor: '#848484',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: textConfirm,
            cancelButtonText: 'Cancelar'
        });
    }
}