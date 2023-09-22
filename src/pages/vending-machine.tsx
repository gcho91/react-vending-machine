import { useState } from "react"
import styles from '@/styles/VendingMachine.module.css'
import Image from "next/image";
import soda from "../../public/soda.png"

interface Drink {
    name: string;
    price: number;
}

let drinks: Drink[] = [
    {
        name: "coke",
        price: 3
    },
    {
        name: "sprite",
        price: 4
    },
    {
        name: "coffee",
        price: 5
    },
    {
        name: "juice",
        price: 3
    },
    {
        name: "dr pepper",
        price: 4
    },
    {
        name: "cream soda",
        price: 10
    }

]

export default function VendingMachine() {

    let [totalWalletAmount, setTotalWalletAmount] = useState(20)
    let [totalInserted, setTotalInserted] = useState(0)
    let [change, setChange] = useState(0)
    let [purchased, setPurchased] = useState<Drink[]>([]);


    const handleInsertMoney = (amountInserted: number) => {
        if (totalWalletAmount < 10) {
            alert('you dont have 10 dollars')
            console.log('you dont have 10 dollars')
        } else {
            setTotalInserted(totalInserted + amountInserted)
            setTotalWalletAmount(totalWalletAmount - amountInserted)
        }
    }

    const handleBuy = (name: string, price: number) => {

        if (totalInserted < price) {
            console.log('i dont have enough money!')
            alert('not enough money')
        } else {
            // setTotalWalletAmount(totalInserted - price)
            setTotalInserted(totalInserted - price)
            setPurchased(purchased => [...purchased, drinks[0]])
        }
    }

    const returnChange = () => {
        if (totalInserted == 0) {
            alert('there is no change to dispense')
            console.log('no change')
        } else {
            setTotalWalletAmount(totalWalletAmount += totalInserted)
            setTotalInserted(0);
        }
    }

    return (
        <div>
            <h1>its a vending machine</h1>
            <p>You have:  ${totalWalletAmount} in your wallet </p>
            <p>Machine has ${totalInserted}</p>
            <p>Insert $10: <button onClick={() => handleInsertMoney(10)}>Insert $10</button></p>

            <button onClick={returnChange}>I want my change!</button>
            <p>Purchased Items: {purchased.map((item, index) => <li key={index}>{item.name}</li>)}</p>

            <div className={styles.machineContainer}>
                {drinks.map(drink => {
                    return <div key={drink.name} className={styles.item}>
                        <div className={styles.imageContainer}>
                            <Image
                                alt="soda can illustration"
                                width={30}
                                height={40}
                                src={soda}
                            />
                        </div>
                        <p>{drink.name}</p>
                        <button onClick={() => handleBuy(drink.name, drink.price)}>${drink.price}</button>
                    </div>
                })}
                <div className={styles.item}>
                    <div className={styles.imageContainer}>
                        <p>inventory placeholder</p>
                    </div>
                </div>
            </div>
        </div>
    )
}