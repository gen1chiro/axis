import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import axisLogo from "@/public/images/axis-logo.png";

const EditPageSkeleton = () => {
    return (
        <main className="w-full max-w-2xl bg-stone-200 rounded-lg p-4 border border-stone-300 z-10">
            <div className="flex flex-col items-start justify-center gap-4 mb-8">
                <div className="flex items-center justify-center gap-1">
                    <IoIosArrowBack className="text-lg text-purple-400"/>
                    <span className="text-sm text-body">BACK TO DASHBOARD</span>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <Image src={axisLogo} alt={'axis logo'} className='w-8 aspect-square sm:w-10'/>
                    <h1 className="text-2xl sm:text-3xl text-heading">Edit Issue</h1>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-xs text-body mb-2">Title</label>
                    <div className="h-11 w-full bg-stone-300 rounded-sm animate-pulse" />
                </div>

                <div>
                    <label className="block text-xs text-body mb-2">Description</label>
                    <div className="h-36 w-full bg-stone-300 rounded-sm animate-pulse" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-body mb-2">Status</label>
                        <div className="h-11 w-full bg-stone-300 rounded-sm animate-pulse" />
                    </div>
                    <div>
                        <label className="block text-xs text-body mb-2">Priority</label>
                        <div className="h-11 w-full bg-stone-300 rounded-sm animate-pulse" />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <div className="px-6 py-2 bg-white rounded-sm">
                        <span className="text-sm text-heading">Cancel</span>
                    </div>
                    <div className="px-6 py-2 bg-zinc-900 rounded-sm">
                        <span className="text-sm text-white">Update</span>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default EditPageSkeleton;
