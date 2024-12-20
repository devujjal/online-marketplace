import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from "react-datepicker";
import useAuth from '../../hookes/useAuth';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../useAxiosSecure/useAxiosSecure';


const JobUpdate = () => {
    const { user } = useAuth();
    const [job, setJob] = useState({})
    const [startDate, setStartDate] = useState(new Date());
    const param = useParams();
    const secure = useAxiosSecure();
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await secure.get(`/job/${param?.id}`);
                // console.log(result.data)
                setJob(result.data)
            }
            catch (error) {
                toast.error("Something went Wrong!")
            }
        }

        if (param?.id) {
            getData()
        }

    }, [param?.id])


    const handleJobUpdate = async (e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget);
        const job_title = form.get('job_title');
        const job_level = form.get('job_level');
        const min = form.get('min_price');
        const max = form.get('max_price');
        const hourly_rate = { min, max };
        const duration = form.get('duration');
        const hours_per_week = form.get('hours_per_week');
        const estimated_time = { duration, hours_per_week };
        const deadline = new Date(startDate).toLocaleDateString();
        const description = form.get('description');
        const tags = form.get('tags');
        const job_tags = tags.split(", ");
        const job_categories = form.get('category');
        const buyer_info = {
            name: user?.displayName,
            email: user?.email,
            photo: user?.photoURL
        }

        const newJob = { job_title, job_level, hourly_rate, estimated_time, deadline, description, job_tags, job_categories, buyer_info }

        try {
            const result = await secure.put(`/job/${param?.id}`, newJob);
            // console.log(result.data)
            if (result.data.modifiedCount > 0) {
                toast.success("Successfully Updated!")
                navigate('/my-posted-job')
            }
        }
        catch (error) {
            toast.error("Something went wrong!")
        }

    }


    return (
        <section>
            <div className="container mx-auto">
                <div className='flex justify-center px-4 items-center min-h-[calc(100vh-306px)] my-12'>
                    <div className=' p-2 md:p-6 w-full md:w-[60%] bg-white rounded-md shadow-md '>
                        <h2 className='text-lg font-semibold text-gray-700 capitalize '>
                            Post a Job
                        </h2>

                        <form onSubmit={handleJobUpdate}>
                            <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
                                <div>
                                    <label className='text-gray-700 ' htmlFor='job_title'>
                                        Job Title
                                    </label>
                                    <input
                                        id='job_title'
                                        name='job_title'
                                        type='text'
                                        defaultValue={job?.job_title}
                                        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    />
                                </div>

                                <div>
                                    <label className='text-gray-700 ' htmlFor='emailAddress'>
                                        Email Address
                                    </label>
                                    <input
                                        id='emailAddress'
                                        type='email'
                                        name='email'
                                        defaultValue={user?.email}
                                        disabled
                                        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    />
                                </div>
                                <div className='flex flex-col gap-2 '>
                                    <label className='text-gray-700'>Deadline</label>

                                    <DatePicker
                                        className="px-4 py-2 w-full border border-gray-200 rounded-md"
                                        selected={startDate}
                                        defaultValue={startDate}
                                        onChange={(date) => setStartDate(date)} />
                                </div>

                                <div className='flex flex-col gap-2 '>
                                    <label className='text-gray-700 ' htmlFor='category'>
                                        Category
                                    </label>
                                    <select
                                        name='category'
                                        id='category'
                                        defaultValue={job?.job_categories}
                                        className='border p-2 rounded-md'
                                    >
                                        <option value='Web Development'>Web Development</option>
                                        <option value='Graphics Design'>Graphics Design</option>
                                        <option value='Digital Marketing'>Digital Marketing</option>
                                    </select>
                                </div>
                                <div>
                                    <label className='text-gray-700 ' htmlFor='min_price'>
                                        Minimum Price
                                    </label>
                                    <input
                                        id='min_price'
                                        name='min_price'
                                        type='number'
                                        defaultValue={job?.hourly_rate?.min}
                                        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    />
                                </div>

                                <div>
                                    <label className='text-gray-700 ' htmlFor='max_price'>
                                        Maximum Price
                                    </label>
                                    <input
                                        id='max_price'
                                        name='max_price'
                                        type='number'
                                        defaultValue={job?.hourly_rate?.max}
                                        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    />
                                </div>
                                <div>
                                    <label className='text-gray-700 ' htmlFor='job_title'>
                                        Job Level
                                    </label>
                                    <input
                                        id='job_level'
                                        name='job_level'
                                        type='text'
                                        defaultValue={job?.job_level}
                                        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    />
                                </div>
                                <div>
                                    <label className='text-gray-700 ' htmlFor='job_title'>
                                        Duration
                                    </label>
                                    <input
                                        id='duration'
                                        name='duration'
                                        type='text'
                                        defaultValue={job?.estimated_time?.duration}
                                        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    />
                                </div>
                                <div>
                                    <label className='text-gray-700 ' htmlFor='job_title'>
                                        Hours Per Week
                                    </label>
                                    <input
                                        id='hours_per_week'
                                        name='hours_per_week'
                                        type='text'
                                        defaultValue={job?.estimated_time?.hours_per_week}
                                        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    />
                                </div>
                                <div>
                                    <label className='text-gray-700 ' htmlFor='job_title'>
                                        Job Tags
                                    </label>
                                    <input
                                        id='tags'
                                        name='tags'
                                        type='text'
                                        defaultValue={job?.job_tags}
                                        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 mt-4'>
                                <label className='text-gray-700 ' htmlFor='description'>
                                    Description
                                </label>
                                <textarea
                                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    name='description'
                                    id='description'
                                    defaultValue={job?.description}
                                    rows={8}
                                ></textarea>
                            </div>
                            <div className='flex justify-end mt-6'>
                                <button type="submit"
                                    className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                    Add Job
                                </button>
                            </div>
                        </form>
                    </div>

                    <Toaster />
                </div>
            </div>
        </section>
    );
};

export default JobUpdate;