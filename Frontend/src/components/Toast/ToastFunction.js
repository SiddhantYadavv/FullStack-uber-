import { toast } from "sonner";

const showToastSuccess = (input) => {
    toast.success(input)
}

const showToastError = (input) => {
    toast.error(input)
}

const showToastInfo = (input) => {
    toast.info(input)
}

export {showToastSuccess,showToastError,showToastInfo}