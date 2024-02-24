import React, { useEffect, useState } from 'react';

const InvoiceGenerator = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [invoiceNumber, setInvoiceNumber] = useState(1);
    const [inv,setInv]=useState(0);
    useEffect(() => {
        setInv(generateInvoiceNumber());
    }, [])

    const generateInvoiceNumber = () => {
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedInvoiceNumber = String(invoiceNumber).padStart(4, '0');
        const invoice = `${year}${formattedMonth}-${formattedInvoiceNumber}`;

        setInvoiceNumber(prevInvoiceNumber =>
            month !== new Date().getMonth() + 1 ? 1 : prevInvoiceNumber + 1
        );
        setYear(new Date().getFullYear());
        setMonth(new Date().getMonth() + 1);

        return invoice;
    };


        const handleClick=()=>{
            let num=invoiceNumber;
            num++;
           setInvoiceNumber(num)
        }
    return (
        <div>
            <h2>Invoice Number: {invoiceNumber} and inv :{inv} </h2>
            <button onClick={handleClick}>click</button>
        </div>
    );
};

export default InvoiceGenerator;