import { useAppKitAccount } from "@reown/appkit/react"
import { useEffect } from "react"
export default function AccountData(){

    
    const { address, isConnected } = useAppKitAccount()
   
    useEffect(
        () => {
            if (address) {
                console.log(`address ${address}`)

            }
        }, [address]
    )

    return (
        <>
        { isConnected &&
        {address}
        }
        </>
    )
}