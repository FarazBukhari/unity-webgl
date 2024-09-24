import WebGL from "@/components/WebGL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnity } from "@fortawesome/free-brands-svg-icons";
import { Suspense } from "react";

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center p-5'>
			<div className='flex items-center gap-4 mb-3'>
				<FontAwesomeIcon icon={faUnity} className='text-3xl text-white' />
				<h1 className='text-lg text-white font-thin'>Unity WebGL</h1>
			</div>
			<div className='h-[90vh] w-[90vw]'>
				<Suspense>
					<WebGL />
				</Suspense>
			</div>
		</main>
	);
}
