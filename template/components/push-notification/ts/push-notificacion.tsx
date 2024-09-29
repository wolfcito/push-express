'use client'

import { useState } from 'react'
import { sendNotification } from '@/service/push-notification'

export function PushNotification() {
  const [walletAddress, setWalletAddress] = useState('')
  const [title, setTitle] = useState('You awesome notification')
  const [body, setBody] = useState('from your amazing protocol')

  return (
    <section className="flex flex-col gap-2 items-center justify-center mt-3 p-4">
      <div className="mb-2 flex flex-col max-w-screen-sm w-full">
        <span>
          Ingresa la <b>address</b> de quien recibirá esta notificación
        </span>
        <input
          type="text"
          className="rounded border px-2 py-1 mt-2 bg-transparent dark:text-white border-purple-500 outline-none font-mono text-sm"
          placeholder="0x123...4567"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          maxLength={42}
          minLength={42}
        />
      </div>

      <div className="mb-2 flex flex-col max-w-screen-sm w-full">
        <span>Título de la notificación</span>
        <input
          type="text"
          className="rounded border px-2 py-1 mt-2 bg-transparent dark:text-white border-purple-500 outline-none font-mono text-sm"
          placeholder="You awesome notification"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-2 flex flex-col max-w-screen-sm w-full">
        <span>Mensaje de la notificación</span>
        <textarea
          className="rounded border px-2 py-1 mt-2 bg-transparent dark:text-white border-purple-500 outline-none font-mono text-sm"
          placeholder="from your amazing protocol"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 max-w-screen-sm w-full">
        <button
          className="rounded-full border border-solid px-3 py-1 text-sm bg-purple-700/20"
          onClick={() => {
            if (walletAddress) {
              sendNotification(walletAddress, title, body)
            } else {
              alert('Por favor, ingresa una dirección de wallet válida')
            }
          }}
        >
          Enviar notificación
        </button>

        <a
          className="rounded-full border border-solid px-3 py-1 text-sm text-center"
          href="https://staging.push.org/channels/0x2eacd83edE279093A55353056E09fFe0824C299b"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver notificación
        </a>
      </div>
    </section>
  )
}
