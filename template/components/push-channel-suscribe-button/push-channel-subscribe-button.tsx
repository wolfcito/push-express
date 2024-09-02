import React from 'react'

interface PushChannelSubscribeButtonProps {
  onClick: () => void
  label: string
}

export const PushChannelSubscribeButton: React.FC<
  PushChannelSubscribeButtonProps
> = ({ onClick, label }) => {
  // Work in progress
  return (
    <button onClick={onClick} style={styles.button}>
      {label}
    </button>
  )
}

const styles = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
}
