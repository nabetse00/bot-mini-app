import { useAppKitAccount } from "@reown/appkit/react"
import { useEffect } from "react"
import { config} from "../config"
import { getBalance } from "wagmi/actions"
export default function AccountData() {


    const { address, isConnected } = useAppKitAccount()


    useEffect(
        () => {
            if (address) {
                console.log(`address ${address}`)
                getBalance(config, {
                    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
                }).then(
                    balance => console.log(`bal ${balance.value}`)
                )

            }
        }, [address]
    )

    return (
        <>
            {isConnected &&
                <p>{address}</p>
            }
        </>
    )
}