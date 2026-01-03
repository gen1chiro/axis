'use client';

//import { FiLoader } from 'react-icons/fi';
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axisLogo from "@/public/images/axis-logo.png";
import { Issue, ISSUE_PRIORITY, ISSUE_STATUS } from "@/db/schema";
import { ActionResponse } from "@/app/actions/auth";
import { createIssue, updateIssue } from "@/app/actions/issues";
import { useActionState } from "react";

type TaskFormProps =
    |{
        issue: Issue
        isEditing: true;
    }
    |{
        isEditing: false;
    }


const initialState: ActionResponse = {
    success: false,
    message: '',
    errors: undefined,
}

const TaskForm = (props: TaskFormProps) => {
    const router = useRouter();
    const { isEditing } = props;

    const [state, formAction, isPending] = useActionState<ActionResponse, FormData>
    (
        async (_, formData) => {
            try {
                const result = isEditing
                    ? await updateIssue(props.issue.id, formData)
                    : await createIssue(formData);

                if (result.success) {
                    router.push('/dashboard');
                }

                return result;
            } catch (err) {
                return {
                    success: false,
                    message: (err as Error).message || 'An error occurred',
                    error: undefined,
                }
            }
    }, initialState);

    const priorityOptions = Object.values(ISSUE_PRIORITY).map(({label, value}) => ({
        label,
        value,
    }))

    const statusOptions = Object.values(ISSUE_STATUS).map(({label, value}) => ({
        label,
        value,
    }))

    return (
        <main className="w-full max-w-2xl bg-stone-200 rounded-lg p-4 border border-stone-300 z-10">
            <div className="flex flex-col items-start justify-center gap-4 mb-8">
                <Link href='/dashboard'
                      className="flex items-center justify-center gap-1 decoration-dotted hover:underline">
                    <IoIosArrowBack className="text-lg text-purple-400"/>
                    <span className="text-sm text-body">BACK TO DASHBOARD</span>
                </Link>
                <div className='flex justify-center items-center gap-2'>
                    <Image src={axisLogo} alt={'axis logo'} className='w-8 aspect-square sm:w-10'/>
                    <h1 className="text-2xl sm:text-3xl text-heading">
                        {isEditing ? 'Edit Issue' : 'Create New Issue'}
                    </h1>
                </div>
                {
                    !state.success && state.message && (
                        <div className='w-full bg-red-100 border border-red-400 text-red-700 text-body p-2 rounded-xs text-xs'>
                            {state.message}
                        </div>
                    )
                }
            </div>
            <form action={formAction} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-xs text-body mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className={`block w-full text-heading text-sm px-3 py-3 bg-stone-100 border rounded-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent ${state.errors?.title ? 'border-red-200' : 'border-stone-300'}`}
                        placeholder="Enter task title"
                    />
                    {
                        state.errors?.title && (
                            <p className="mt-1 text-xs text-body text-red-600">
                                {state.errors.title[0]}
                            </p>
                        )
                    }
                </div>

                <div>
                    <label htmlFor="description" className="block text-xs text-body mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={6}
                        className="block w-full text-heading text-sm px-3 py-3 bg-stone-100 border border-stone-300 rounded-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        placeholder="Describe the task in detail..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="status" className="block text-xs text-body mb-2">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            defaultValue='backlog'
                            className={`block w-full text-heading text-sm px-3 py-3 bg-stone-100 border rounded-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer ${state.errors?.status ? 'border-red-200' : 'border-stone-300'}`}
                        >
                            {
                                statusOptions.map(({label, value}) => (
                                    <option key={value} value={value}>{label}</option>
                                ))
                            }
                        </select>
                        {
                            state.errors?.status && (
                                <p className="mt-1 text-xs text-body text-red-600">
                                    {state.errors.status[0]}
                                </p>
                            )
                        }
                    </div>

                    <div>
                        <label htmlFor="priority" className="block text-xs text-body mb-2">
                            Priority
                        </label>
                        <select
                            id="priority"
                            name="priority"
                            defaultValue='low'
                            className={`block w-full text-heading text-sm px-3 py-3 bg-stone-100 border rounded-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer ${state.errors?.priority ? 'border-red-200' : 'border-stone-300'}`}
                        >
                            {
                                priorityOptions.map(({label, value}) => (
                                    <option key={value} value={value}>{label}</option>
                                ))
                            }
                        </select>
                        {
                            state.errors?.priority && (
                                <p className="mt-1 text-xs text-body text-red-600">
                                    {state.errors.priority[0]}
                                </p>
                            )
                        }
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 text-heading">
                    <Link
                        href='/dashboard'
                        className="px-6 py-2 text-sm rounded-sm bg-white hover:bg-stone-100 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={ isPending }
                        className="px-6 py-2 bg-zinc-900 text-white text-sm rounded-sm hover:bg-zinc-800 transition-colors flex items-center gap-2 justify-center"
                    >
                        Create
                    </button>
                </div>
            </form>
        </main>
    );
}

export default TaskForm;