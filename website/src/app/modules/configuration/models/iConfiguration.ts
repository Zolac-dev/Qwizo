export interface IConfiguration{
    server ?: {
        port ?: number
    },
    users ?: {
        messages?: {
            max?: number
        }
    },
    twitch ?: {
        broadcastId ?: string,
        bot ?: {
            id ?: string,
            secret ?: string
        }
    }
}