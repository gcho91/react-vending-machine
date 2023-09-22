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
    },

]

export default function VendingMachine() {

    let [totalWalletAmount, setTotalWalletAmount] = useState(10)
    let [purchased, setPurchased] = useState<Drink[]>([]);

    console.log(purchased, 'p')

    const handleBuy = (name: string, price: number) => {
        // error if not enough money
        // if neough money, buy and return change
        console.log('clicking buy', name, price)
        console.log(totalWalletAmount, 'total money')
        if (totalWalletAmount < price) {
            console.log('i dont have enough money!')
            alert('not enough money')
        } else {
            setTotalWalletAmount(totalWalletAmount - price)
            setPurchased(purchased => [...purchased, drinks[0]])
        }
    }

    return (
        <div>
            <h1>its a vending machine</h1>
            <p>You have:  ${totalWalletAmount} </p>

            <p>Purchased Items: {purchased.map((item, index) => <li key={index}>{item.name}</li>)}</p>

            <div className={styles.machineContainer}>
                {drinks.map(drink => {
                    return <div key={drink.name} className={styles.item}>
                        <div className={styles.imageContainer}>

                            <Image
                                alt="soda can illustration"
                                width={30}
                                height={40}
                                // fill={true}
                                src={soda}
                            />
                        </div>
                        <p>{drink.name}</p>
                        <button onClick={() => handleBuy(drink.name, drink.price)}>${drink.price}</button>
                        {/* <p>test</p> */}
                    </div>
                })}
            </div>
        </div>
    )
}