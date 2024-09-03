"use client";
import React, { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnity } from "@fortawesome/free-brands-svg-icons";

const unityContextLocation: string = "/unity/Build";
const streamingAssestLocation: string = "unity/StreamingAssets";
const fileName: string = "TestBuild";

const WebGL = () => {
	const [devicePixelRatio, setDevicePixelRatio] = useState<number | null>(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
		loaderUrl: `${unityContextLocation}/${fileName}.loader.js`,
		dataUrl: `${unityContextLocation}/${fileName}.data.unityweb`,
		frameworkUrl: `${unityContextLocation}/${fileName}.framework.js.unityweb`,
		codeUrl: `${unityContextLocation}/${fileName}.wasm.unityweb`,
		streamingAssetsUrl: streamingAssestLocation,
	});

	const loadingPercentage = Math.round(loadingProgression * 100);

	const calculateDimensions = () => {
		const aspectRatio = 16 / 9; // 16:9 aspect ratio
		const maxWidth = window.innerWidth * 0.9; // 90% of the viewport width
		const maxHeight = window.innerHeight * 0.85; // 85% of the viewport height

		let width = maxWidth;
		let height = width / aspectRatio;

		if (height > maxHeight) {
			height = maxHeight;
			width = height * aspectRatio;
		}

		setDimensions({ width, height });
	};

	useEffect(
		function () {
			// A function which will update the device pixel ratio of the Unity
			// Application to match the device pixel ratio of the browser.
			const updateDevicePixelRatio = function () {
				setDevicePixelRatio(window.devicePixelRatio);
			};
			// A media matcher which watches for changes in the device pixel ratio.
			const mediaMatcher = window.matchMedia(`screen and (resolution: ${devicePixelRatio}dppx)`);
			// Adding an event listener to the media matcher which will update the
			// device pixel ratio of the Unity Application when the device pixel
			// ratio changes.
			mediaMatcher.addEventListener("change", updateDevicePixelRatio);
			return function () {
				// Removing the event listener when the component unmounts.
				mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
			};
		},
		[devicePixelRatio]
	);

	useEffect(() => {
		calculateDimensions();
		window.addEventListener("resize", calculateDimensions);
		return () => {
			window.removeEventListener("resize", calculateDimensions);
		};
	}, []);

	return (
		<div className='flex h-full w-full justify-center items-center'>
			{!isLoaded && (
				<div className='loading-overlay flex flex-col h-full w-full justify-center items-center text-white'>
					<div className='m-12'>
						<FontAwesomeIcon icon={faUnity} className='text-6xl text-white animate-spin' style={{ transformOrigin: "center" }} />
					</div>
					<p>Loading build... ({loadingPercentage}%)</p>
				</div>
			)}
			<Unity
				unityProvider={unityProvider}
				className='unity-canvas'
				devicePixelRatio={devicePixelRatio!}
				style={{
					height: `${dimensions.height}px`,
					width: `${dimensions.width}px`,
					display: isLoaded ? "flex" : "none",
					position: "relative",
					aspectRatio: "16/9",
				}}
			/>
		</div>
	);
};

export default WebGL;
