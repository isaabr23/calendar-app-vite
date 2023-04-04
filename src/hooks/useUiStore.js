import { useSelector, useDispatch } from "react-redux";
import { onClouseDataModal, onOpenDataModal } from "../store/ui/uiSlice";


export const useUiStore = () => {

    const dispatch = useDispatch();

    const { isDateModalOpen } = useSelector( state => state.ui );

    const openDateModal = () => {
        dispatch( onOpenDataModal() )
    }

    const closeDateModal = () => {
        dispatch( onClouseDataModal() )
    }
    
    // const toggleDateModal = () => {
    //     ( isDateModalOpen )
    //         ? openDateModal
    //         : closeDateModal
    // }

    return {
        // Propiedades
        isDateModalOpen,

        // Metodos
        openDateModal,
        closeDateModal,
        // toggleDataModal
    }
}