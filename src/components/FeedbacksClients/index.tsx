import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import sliderSettings from "../../utils/sliderSettings";
//icons
import { BsChatLeftQuote, BsStar, BsStarFill } from 'react-icons/bs';
//firebase
import { collection, onSnapshot, query } from 'firebase/firestore';
//config
import { db } from '../../config/firebaseConfig';
//components
import Container from '../Container';
//interface
import type { ListComments } from '../../interface';

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

    if (comments.length === 0) {
        return null; 
    }

    return (
        <section className="relative bg-cover bg-center" style={{ backgroundImage: "url('./bg-comments-2.jpg')" }}>
            <div className="absolute inset-0 bg-pink-800 opacity-80"></div>
            <Container>
                <div className='text-center py-10 relative z-10'>
                    <div className='absolute top-10 left-10 text-pink-800 text-6xl'>
                        <BsChatLeftQuote />
                    </div>
                    <h2 className='text-white text-3xl py-15'>Experiências dos nossos clientes</h2>
                    <Slider {...sliderSettings}>
                        {comments.map(comment => (
                            <div key={comment.id}>
                                <p className='text-white/70 pb-6 px-20'>"{comment.message}"</p>
                                <div className="flex gap-1 items-center justify-center mb-6 text-yellow-300">
                                    {[1, 2, 3, 4, 5].map((star) =>
                                        comment.rating >= star ? <BsStarFill key={star} /> : <BsStar key={star} />
                                    )}
                                </div>
                                <div className='mb-3'>
                                    <img src={comment.imagem} alt={comment.name} className='rounded-full w-36 h-36 object-cover mx-auto' />
                                </div>
                                <h2 className='text-white text-2xl'>{comment.name}</h2>
                                
                            </div>
                        ))}
                    </Slider>
                    <div className='absolute bottom-10 right-10 text-white/10 text-6xl rotate-180'>
                        <BsChatLeftQuote />
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default FeedbacksClients
