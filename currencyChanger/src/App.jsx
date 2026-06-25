import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrenctInfo'
import backgroundImage from './assets/backgroundImage.jpg'
import Clock from './components/Clock'

function App() {
    const[amount, setAmount]=useState(0);
    const[from, setFrom]=useState("usd");
    const[to, setTo]=useState("inr");
    const[convertedAmount, setConvertedAmount]=useState(0);

    const currencyInfo=useCurrencyInfo(from)||{};

    const option = Object.keys(currencyInfo);

    const swap=()=>{
        setFrom(to);
        setTo(from);
        setConvertedAmount(amount);
        setAmount(convertedAmount);
    }

    const convert=()=>{
        setConvertedAmount(amount*currencyInfo[to]);
    }
  
    return (
        <div
            className="w-full h-screen flex flex-col justify-between items-end bg-cover bg-no-repeat p-6 md:p-12 "
            style={{backgroundImage:`url(${backgroundImage})`}}
        >
                <div className='w-full flex justify-end p-4 md:p-8'>
                    <Clock/>
                </div>
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert();
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOption={option}
                                onCurrencyChange={(currency)=>setFrom(currency)}
                                selectCurrency={from}
                                onAmountChange={(amount)=>setAmount(amount)}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOption={option}
                                onCurrencyChange={(currency)=>setTo(currency)}
                                selectCurrency={to}
                                amountDisable
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg active:opacity-80">
                            Convert {from.toUpperCase()} to{to.toUpperCase()}
                        </button>
                    </form>
                </div>
        </div>
    );
}

export default App  