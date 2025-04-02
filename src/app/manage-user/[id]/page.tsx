'use client'
import { getUserById } from '@/services/user.service'
import React, { Suspense, useActionState, useEffect, useState } from 'react'

const page = async ({ params, }: { params: Promise<{ id: string }> }) => {

    const { id } = await params;
    const [loading,setLoading]=useState(false)
    const fetchDetails = async () => {
        setLoading(true)
        const data = await getUserById(id);
        setLoading(false)
        return data; // Ensure the function returns data
    };

    const [user, setUser] = useActionState(fetchDetails, null); // Ensure useActionState gets a proper value

    useEffect(() => {
        fetchDetails().then(setUser); // Ensure state is updated with fetched data
    }, [id]);

    if (loading){
return <p>Please wait</p>
}


    return (
        <div>
            <h1>User Details</h1>

            <Suspense>
                {JSON.stringify(user)}
            </Suspense>
        </div>
    )
}

export default page