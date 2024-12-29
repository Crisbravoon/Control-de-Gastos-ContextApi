

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(
        'es-CL',
        { style: 'currency', currency: 'CLP' }).format(amount)
};


export const formatDate = (dateStr: string) => {

    const dateObj = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        weekday:'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',

    }
    return new Intl.DateTimeFormat('es-ES', options).format(dateObj);
};
