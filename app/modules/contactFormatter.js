export function contactFormatter (data) {
    let dataRemove = {
        'BEGIN:VCARD': 'Data Kontak',
        'FN:': 'Nama: ',
        'N:': 'Nama: ',
        'ORG:': 'Perusahaan: ',
        'EMAIL;TYPE=INTERNET:': 'Email: ',
        'URL:': 'Website: ',
        'TEL:': 'Handphone: ',
        'ADR:;;': 'Alamat: ',
        'END:VCARD': '',
        'VERSION:3.0': '',
        'VERSION:2.1': '',
        'VERSION:2.0': ''
    }
    let editedContact = data.replace(/BEGIN:VCARD|FN:|N:|ORG:|EMAIL;TYPE=INTERNET:|URL:|TEL:|ADR:;;|END:VCARD|VERSION:3.0|VERSION:2.1|VERSION:2.0/gi, matched => {
        return dataRemove[matched];
    });
    return editedContact
}