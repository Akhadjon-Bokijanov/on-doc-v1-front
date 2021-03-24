import React from 'react'

const PaymeForm = () => {
    return (
        <div>
            <form method="post" action="https://checkout.payme.uz">
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default PaymeForm
