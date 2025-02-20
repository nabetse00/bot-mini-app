import { useAppKitAccount } from "@reown/appkit/react"
import { useEffect } from "react"
import { config } from "../config"
import { getBalance } from "wagmi/actions"
import { postEvent } from '@telegram-apps/bridge';
import { Address } from 'viem';

export default function AccountData() {


    const { address, isConnected } = useAppKitAccount()



    useEffect(
        () => {
            if (address) {
                console.log(`address ${address}`)
                getBalance(config, {
                    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
                }).then(
                    balance => {
                        console.log(`from effect bal ${balance.value}`)
                        const data = { address: address, balance: balance.value.toString() }
                        postEvent('web_app_data_send', { data: JSON.stringify(data) });
                        postEvent('web_app_invoke_custom_method', { req_id: "1", method: "test", params: data });
                    }
                )
            }
        }, [address]
    )

    async function test_send_data(address: Address) {

        const balance = await getBalance(config, {
            address: address,
        })

        console.log(`bal ${balance.value}`)
        const data = { address: address, balance: balance.value.toString() }
        console.log("sending web_app_data")
        postEvent('web_app_data_send', { data: JSON.stringify(data) });

        console.log("sending web_app_invoke custom method")
        postEvent('web_app_invoke_custom_method', { req_id: "1", method: "test", params: data });
    }



    return (
        <>
            {isConnected &&
                <> <p>
                    {address}
                </p>

                    <button onClick={() => test_send_data(address as Address)}>
                        test send data
                    </button>
                </>

            }
        </>
    )
}
