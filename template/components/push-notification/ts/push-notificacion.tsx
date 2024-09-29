'use client'

export function PushNotification() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-3">
      <ol className="list-inside list-decimal text-sm text-center">
        <li className="mb-2">
          Ingresa tu wallet address{' '}
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            0x123...4567
          </code>
        </li>
        <li>Click en enviar notificación & disfruta.</li>
      </ol>

      <button
        className="rounded-full border border-solid px-4 py-2"
        onClick={() => console.log('Send notification')}
      >
        enviar notification
      </button>
    </div>
  )
}
