import { create } from 'zustand'

type Post = {
  id: number
  authorName: string
  authorRole: string
  authorAvatar: any
  caption: string
  postMedia?: string
  mediaType?: 'image' | 'video'
  createdAt: number
  initialLikes: number
  initialIsLiked: boolean
}

type PostStore = {
  posts: Post[]
  addPost: (post: Post) => void
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [
    {
      id: 1,
      authorName: 'Nguyễn Phước Gia Bảo',
      authorRole: 'Badminton',
      authorAvatar: require('../assets/images/avt.png'),
      createdAt: new Date('2025-05-18T18:00:00').getTime(),
      caption: 'Nguyễn Phước Gia Bảo champion 🏆',
      postMedia: require('../assets/images/npgb.jpg'),
      mediaType: 'image',
      initialLikes: 10,
      initialIsLiked: false,
    },
    {
      id: 2,
      authorName: 'Lê Minh Thế',
      authorRole: 'Volleyball',
      authorAvatar: require('../assets/images/avt2.jpg'),
      createdAt: new Date('2025-05-15T18:00:00').getTime(),
      caption: 'Chiến thắng dễ dàng 🏐🔥',
      postMedia: require('../assets/images/avt2.jpg'),
      mediaType: 'image',
      initialLikes: 5,
      initialIsLiked: true,
    },
  ],
  addPost: (post) =>
    set((state) => ({
      posts: [{ ...post, id: Date.now() }, ...state.posts],
    })),
}))
