import { useState } from "react";


export const HandleForm = () => {

    const [isBillDate, setIsBillDate] = useState(true);
    const [isBillEnd, setIsBillEnd] = useState(true);

    const UnlockBillDate = () => {
        setIsBillDate(false)
        console.log('unlock')

    }
    const UnlockBillEnd = () => {
        setIsBillEnd(false)
        console.log('unlock')

    }

    const [formErrors, setFormErrors] = useState({})
    const [formErrorsAddress, setFormErrorsAddress] = useState({})

    const [defaultData, setdefaultData] = useState({
        id: "",
        receipt: "",
        invoice: "",
        reimbursement: "",
        booking: "",
        bill: "",
        accNo: "",
        billDate: "",
        billEnd: "",
    })

    const [defaultAddress, setdefaultAddress] = useState({
        id: "",
        name: "",
        code: "",
        tel: "",
        no: "",
        province: "",
        road: "",
        village: "",
        boundary: "",
        district: "",
        alley: "",
    })

    const handleChangebill = (e) => {

        let _defaultData = defaultData
        const Data = {
            target: {
                id: "billDate",
                value: e
            }
        }
        _defaultData[Data.target.id] = Data.target.value;
        setdefaultData({ ..._defaultData })
        setFormErrors(validate(_defaultData))
        console.log('set', _defaultData)



    }
    const handleChangebillend = (e) => {

        let _defaultData = defaultData
        const Data = {
            target: {
                id: "billEnd",
                value: e
            }
        }
        _defaultData[Data.target.id] = Data.target.value;
        setdefaultData({ ..._defaultData })
        setFormErrors(validate(_defaultData))
        console.log('set', _defaultData)



    }


    const handleOnchangeReceipt = (e) => {


        console.log("eee", e.target.value)
        let _defaultData = defaultData

        if (e.target.id === "receipt" || e.target.id === "invoice" || e.target.id === "reimbursement" || e.target.id === "booking"
            || e.target.id === "bill" || e.target.id === "accNo" || e.target.id === "billDate" || e.target.id === "billEnd") {
            _defaultData[e.target.id] = e.target.value;
            setdefaultData({ ..._defaultData })
            setFormErrors(validate(_defaultData))
            console.log('set', _defaultData)



        }


        console.log("FormErrors", formErrors)


    }

    const handleOnchangeAddress = (e) => {

        let _defaultAddress = defaultAddress

        if (e.target.id === "name" || e.target.id === "tel" || e.target.id === "no" || e.target.id === "road" || e.target.id === "village"
            || e.target.id === "alley" || e.target.id === "boundary" || e.target.id === "district" || e.target.id === "province" || e.target.id === "code") {
            _defaultAddress[e.target.id] = e.target.value;
            setdefaultAddress({ ..._defaultAddress })
            setFormErrorsAddress(validateAddress(_defaultAddress))
            console.log('set', _defaultAddress)


        }
        console.log("formErrorsAddress", formErrorsAddress)


    }
    //validate


    const validate = (values) => {
        const errors = {}
        const text = /^[A-Za-z0-9]+$/;
        if (!values.receipt) {
            errors.receipt = "receipt is required!"
        } else if (!text.test(values.receipt)) {
            errors.receipt = "receipt is not Format!"
        } else if (values.receipt.length > 10) {
            errors.receipt = "receipt is not Format!"
        }

        if (!values.invoice) {
            errors.invoice = "invoice is required!"
        } else if (!text.test(values.invoice)) {
            errors.invoice = "invoice is not Format!"
        } else if (values.invoice.length > 10) {
            errors.invoice = "invoice is not Format!"
        }


        if (!values.booking) {
            errors.booking = "booking is required!"
        } else if (!text.test(values.booking)) {
            errors.booking = "booking is not Format!"
        } else if (values.booking.length > 10) {
            errors.booking = "booking is not Format!"
        }

        if (!values.reimbursement) {
            errors.reimbursement = "reimbursement is required!"
        } else if (!text.test(values.invoice)) {
            errors.reimbursement = "reimbursement is not Format!"
        } else if (values.reimbursement.length > 10) {
            errors.reimbursement = "reimbursement is not Format!"
        }

        if (!values.bill) {
            errors.bill = "bill is required!"
        } else if (!text.test(values.bill)) {
            errors.bill = "bill is not Format!"
        } else if (values.bill.length > 10) {
            errors.bill = "bill is not Format!"
        }

        if (!values.accNo) {
            errors.accNo = "accNo is required!"
        } else if (!text.test(values.accNo)) {
            errors.accNo = "accNo is not Format!"
        } else if (values.accNo.length > 10) {
            errors.accNo = "accNo is not Format!"
        }

        if (!values.billDate) {
            errors.billDate = "billDate is required!"
        }

        if (!values.billEnd) {
            errors.billEnd = "billend is required!"
        } 








        return errors

    }

    const validateAddress = (values) => {
        const errors = {}
        const text = /^[A-Za-z0-9ก-๙/]+$/;
        //address

        if (!values.name) {
            errors.name = "name is required!"
        } else if (!text.test(values.name)) {
            errors.name = "name is not Format!"
        } else if (values.name.length > 10) {
            errors.name = "name is not Format!"
        }



        if (!values.code) {
            errors.code = "code is required!"
        } else if (!text.test(values.code)) {
            errors.code = "code is not Format!"
        } else if (values.code.length > 10) {
            errors.code = "code is not Format!"
        }

        if (!values.tel) {
            errors.tel = "tel is required!"
        } else if (!text.test(values.tel)) {
            errors.tel = "tel is not Format!"
        } else if (values.tel.length > 10) {
            errors.tel = "tel is not Format!"
        }


        if (!values.no) {
            errors.no = "no is required!"
        } else if (!text.test(values.no)) {
            errors.no = "no is not Format!"
        } else if (values.no.length > 10) {
            errors.no = "no is not Format!"
        }

        if (!values.province) {
            errors.province = "province is required!"
        } else if (!text.test(values.province)) {
            errors.province = "province is not Format!"
        } else if (values.province.length > 10) {
            errors.province = "province is not Format!"
        }

        if (!values.road) {
            errors.road = "road is required!"
        } else if (!text.test(values.road)) {
            errors.road = "road is not Format!"
        } else if (values.road.length > 10) {
            errors.road = "road is not Format!"
        }


        if (!values.village) {
            errors.village = "village is required!"
        } else if (!text.test(values.village)) {
            errors.village = "village is not Format!"
        } else if (values.village.length > 10) {
            errors.village = "village is not Format!"
        }

        if (!values.boundary) {
            errors.boundary = "boundary is required!"
        } else if (!text.test(values.boundary)) {
            errors.boundary = "boundary is not Format!"
        } else if (values.boundary.length > 10) {
            errors.boundary = "boundary is not Format!"
        }

        if (!values.district) {
            errors.district = "district is required!"
        } else if (!text.test(values.district)) {
            errors.district = "district is not Format!"
        } else if (values.district.length > 10) {
            errors.district = "district is not Format!"
        }


        if (!values.alley) {
            errors.alley = "alley is required!"
        } else if (!text.test(values.alley)) {
            errors.alley = "alley is not Format!"
        } else if (values.alley.length > 10) {
            errors.alley = "alley is not Format!"
        }






        return errors

    }

    //validate


    const [blankAddress, setblankblankAddress] = useState({
        id: "",
        name: "",
        code: "",
        tel: "",
        no: "",
        province: "",
        road: "",
        village: "",
        boundary: "",
        district: "",
        alley: "",
    })

    const [blankReceipt, setblankReceipt] = useState({
        id: "",
        receipt: "",
        invoice: "",
        reimbursement: "",
        booking: "",
        bill: "",
        accNo: "",
        billDate: "",
        billEnd: "",
    })


    const [disableReceipt, setDisableReceipt] = useState({
        disabled: true,
        disabled2: true
    })



    const [disabledAddress, setDisabledAddress] = useState(true)
    const [disabledReceipt, setDisabledReceipt] = useState(true)

    const handleClick = (e) => {
        const { name } = e.target
        if (name === 'clearPage-receipt') {
            let tempDisabled = { ...disableReceipt, disabled: false }
            setDisableReceipt(tempDisabled)
            setdefaultData(blankReceipt)
            setDisabledReceipt(false)
            UnlockBillDate()
            UnlockBillEnd()

        }
        if (name === 'edit-receipt') {
            let tempDisabled = { ...disableReceipt, disabled: false }
            setDisableReceipt(tempDisabled)
            setDisabledReceipt(false)
            UnlockBillDate()
            UnlockBillEnd()

        }
        if (name === 'clearPage-address') {
            let tempDisabled = { ...disableReceipt, disabled2: false }
            setDisableReceipt(tempDisabled)
            setdefaultAddress(blankAddress)
            setDisabledAddress(false)

        }
        if (name === 'edit-address') {
            let tempDisabled = { ...disableReceipt, disabled2: false }
            setDisableReceipt(tempDisabled)
            setDisabledAddress(false)

        }
    }



    return {
        handleOnchangeReceipt, handleOnchangeAddress, formErrorsAddress, formErrors, defaultData, setdefaultData, defaultAddress, setdefaultAddress,
        handleClick, disableReceipt, setDisableReceipt, disabledAddress, disabledReceipt, setDisabledReceipt, setDisabledAddress, handleChangebill ,
        handleChangebillend ,isBillDate,setIsBillDate,isBillEnd,setIsBillEnd,UnlockBillDate,UnlockBillEnd
    }

}


