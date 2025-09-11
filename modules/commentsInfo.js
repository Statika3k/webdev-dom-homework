// Массив с информацией о каждом комментарии
export let comments = []

export const updateComments = (newComments) => {
    comments = newComments.map(comment => ({
        author: {
            name: comment.author.name
        },
        text: comment.text,
        date: comment.date,
        likes: comment.likes,
        isLiked: false,
        replies: []
    }))
}
