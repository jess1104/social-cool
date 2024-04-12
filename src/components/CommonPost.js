import { Item, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
const ellipsisStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
};

function CommonPost({ post }) {
    return <Item as={Link} to={`/${post.id}`}>
        <Item.Image src={post.imageUrl || 'https://react.semantic-ui.com/images/wireframe/image.png'} />
        <Item.Content>
            <Item.Meta>
                {post.author.photoURL ? <Image avatar src={post.author.photoURL} /> : <Icon name='user circle' />}
                {post.topic}．{post.author.displayName || '使用者'}
            </Item.Meta>
            <Item.Header>{post.title}</Item.Header>
            <Item.Meta>{post.createdAt?.toDate().toLocaleDateString()}</Item.Meta>
            <Item.Description style={{ ...ellipsisStyle }}>{post.content}</Item.Description>
            <Item.Extra>留言 {post.commentsCount || 0}．讚 {post.likedBy?.length || 0}</Item.Extra>
        </Item.Content>
    </Item>
}

export default CommonPost