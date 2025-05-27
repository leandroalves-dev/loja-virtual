import Slider from 'react-slick';
import sliderSettings from "../../utils/sliderSettings";
import Container from '../Container';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import type { ListComments } from '../../interface';
import { BsChatLeftQuote } from 'react-icons/bs';

const FeedbacksClients = () => {

    const [comments, setComments] = useState<ListComments[]>([])

    useEffect(() => {

        const comments = query(collection(db, 'comments'));
        const getComments = onSnapshot(comments, allComments => {
            const data: ListComments[] = allComments.docs.map(comment => ({
                id: comment.id,
                ...(comment.data() as Omit<ListComments, 'id'>)
            }))

            setComments(data);
        })
        return () => getComments()
    },[])

    console.log('TODOS OS COMENTÁRIO:', comments)

    if (comments.length === 0) {
        return null; 
    }

    return (
        <section className="bg-cover bg-zinc-800/20 bg-center">
            <Container>
                <div className='text-center py-20 relative'>
                    <div className='absolute top-10 left-10 text-pink-800 text-6xl'>
                        <BsChatLeftQuote />
                    </div>
                    <Slider {...sliderSettings}>
                        {comments.map(comment => (
                            <div key={comment.id}>
                                <div className='mb-3'>
                                    <img src={comment.imagem} alt={comment.name} className='rounded-full w-36 h-36 object-cover mx-auto' />
                                </div>
                                <h2 className='text-white text-2xl'>{comment.name}</h2>
                                <p className='text-white/70 py-2 px-20'>"{comment.message}"</p>
                            </div>
                        ))}
                    </Slider>
                    <div className='absolute bottom-10 right-10 text-pink-800 text-6xl rotate-180'>
                        <BsChatLeftQuote />
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default FeedbacksClients
