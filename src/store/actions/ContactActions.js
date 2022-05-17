// import {
//     createContact,
//     formatContacts,
//     getContacts,
//     deleteContact,
//     updateContact,
// } from '../../services/ContactsService';
// import {
//     CONFIRMED_CREATE_CONTACT_ACTION,
//     CONFIRMED_DELETE_CONTACT_ACTION,
//     CONFIRMED_EDIT_CONTACT_ACTION,
//     CONFIRMED_GET_CONTACTS,
// } from './ContactTypes';

// export function deleteContactAction(contactId, history) {
//     return (dispatch, getState) => {
//         deleteContact(contactId).then((response) => {
//             dispatch(confirmedDeleteContactAction(contactId));
//             history.push('/contact');
//         });
//     };
// }

// export function confirmedDeleteContactAction(contactId) {
//     return {
//         type: CONFIRMED_DELETE_CONTACT_ACTION,
//         payload: contactId,
//     };
// }

// export function createContactAction(contactData, history) {
   
// 	return (dispatch, getState) => {
//         createContact(contactData).then((response) => {
//             const singleContact = {
//                 ...contactData,
//                 id: response.data.name,
//             };
//             dispatch(confirmedCreateContactAction(singleContact));
//             history.push('/contact');
//         });
//     };
// }

// export function getContactsAction() {
//     return (dispatch, getState) => {
//         getContacts().then((response) => {
//             let contacts = formatContacts(response.data);
//             dispatch(confirmedGetContactsAction(contacts));
//         });
//     };
// }

// export function confirmedCreateContactAction(singleContact) {
	
//     return {
//         type: CONFIRMED_CREATE_CONTACT_ACTION,
//         payload: singleContact,
//     };
// }

// export function confirmedGetContactsAction(contacts) {
//     return {
//         type: CONFIRMED_GET_CONTACTS,
//         payload: contacts,
//     };
// }

// export function confirmedUpdateContactAction(contact) {

//     return {
//         type: CONFIRMED_EDIT_CONTACT_ACTION,
//         payload: contact,
//     };
// }

// export function updatePostAction(contact, history) {
//     return (dispatch, getState) => {
//         updateContact(contact, contact.id).then((reponse) => {
//             dispatch(confirmedUpdateContactAction(contact));
//             history.push('/contact');
//         });
			
//     };
// }
import * as types from './ContactTypes';
import axios from 'axios';
import axiosInstance from '../../services/AxiosInstance';

const getAllContact =(contacts) =>({
    type: types.GET_CONTACTS,
    payload: contacts,

});
const contactDeleted=()=>({
    type: types.GET_CONTACTS,
});

const contactAdded =()=>({
    type: types.ADD_CONTACT,
});

export const loadContacts=()=>{
    return function(dispatch) {
        axiosInstance.get('contacts/').then((response) => {
            console.log("response",response);
            dispatch(getAllContact(response.data))
        }).catch((error) => console.log(error))
    }
};
export const deleteContact =(id) => {
    return function(dispatch){
        axiosInstance.delete(`contacts/${id}`).then((response) => {
            console.log("response deleteContact",response);
            dispatch(contactDeleted());
            dispatch(loadContacts())
        }).catch((error) =>console.log(error));
    }
}
export const addContact=(contact) => {
    return function(dispatch){
        axiosInstance.post(`contacts/`,contact).then((response) => {
            console.log("response addContact",response);
            dispatch(contactAdded());
        }).catch((error) =>console.log(error));
    }
}