self.addEventListener('activate', async () => {
    // This will be called only once when the service worker is activated.
    try {
        const options = {
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array('BB5BgE51qZqiB702fwSgTI7abM5J6_K4KPIEar5WS6NzugCL3xxHnrnicdY7hrEAOgNWZcVNBaldTJboztKWZJM'),
        }
        const subscription = await self.registration.pushManager.subscribe(options)
        const response = await saveSubscription(subscription)
        console.log(response)
    } catch (err) {
        console.log('Error', err)
    }
})

const urlB64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

const saveSubscription = async subscription => {
    // const SERVER_URL = 'http://localhost:4000/save-subscription'
    // const response = await fetch(SERVER_URL, {
    //     method: 'post',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(subscription),
    // })
    // return response.json()
    console.log('Subscription', subscription)
}

self.addEventListener('push', function(event) {
    if (event.data) {
        console.log('Push event!! ', event.data.text())
    } else {
        console.log('Push event but no data')
    }
})
