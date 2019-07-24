export type MessageType = "success" | "confirm" | "error"

export type Message = {
    type: MessageType,
    message: string
}

export type DialogMessageProps = {
    message: Message,
    onOk: () => void,
    onCancel: () => void
}