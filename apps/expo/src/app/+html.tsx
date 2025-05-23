import { ScrollViewStyleReset } from 'expo-router/html'

// This file is web-only and used to configure the root HTML for every
// web page during static rendering.
// The contents of this function only run in Node.js environments and
// do not have access to the DOM or browser APIs.
export default function Root({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			{/* <head style={{ backgroundColor: '#F09458' }}> */}
			<head>
				<meta charSet='utf-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, shrink-to-fit=no'
				/>
				<meta name='mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-title' content='Pacte' />
				{/* <meta name='theme-color' content='#F09458' /> */}

				{/* 
          Disable body scrolling on web. This makes ScrollView components work closer to how they do on native. 
          However, body scrolling is often nice to have for mobile web. If you want to enable it, remove this line.
        */}
				<ScrollViewStyleReset />

				{/*
				Using raw CSS styles as an escape-hatch to ensure the background color never flickers in dark-mode.
				And support SSR https://tamagui.dev/docs/core/configuration
				*/}

				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
				{/* <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} /> */}
				{/* <style dangerouslySetInnerHTML={{ __html: tamaguiConfig.getCSS() }} /> */}
			</head>
			<body>{children}</body>
		</html>
	)
}

// const responsiveBackground = `
// body {
//   background-color: #fff;
// }
// @media (prefers-color-scheme: dark) {
//   body {
//     background-color: #000;
//   }
// }`
