export type Post = {
    id: string,
    title?: string,
    tags?: string[],
    content?: string,
    ownerId: string,
    remarks?: string,
    insertDateTime: string,
    updateDateTime: string
}