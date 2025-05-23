import { type GetProps, ScrollView, View, YStack, styled } from 'tamagui'

import { useTranslation } from '@aipacto/shared-ui-localization'
import { DEFAULT_BOTTOM_FREE_SPACE } from '../theme'
import { CoText } from './co_text'

/**
 * CoPage component for consistent page layouts.
 * Provides responsive sizing and flexible content alignment.
 * When a title is provided, it's positioned at the top of the content area
 * and follows the same width constraints as the content.
 *
 * @component
 * @example
 * <CoPage narrow="small" title="My Page">
 *   ...
 * </CoPage>
 */
export const CoPage = ({
	children,
	error,
	isLoading,
	narrow,
	title,
	centered = 'horizontal',
	...props
}: CoPageProps) => {
	const { t } = useTranslation()

	// Common title rendering component
	const renderTitle = title && (
		<YStack paddingBottom='$gapMd'>
			<CoText display-m>{title}</CoText>
		</YStack>
	)

	if (isLoading) {
		return (
			<Base {...props} centered={centered}>
				<ContentWrapper centered='both'>
					<ContentContainer
						alignItems='center'
						justifyContent='center'
						narrow='small'
					>
						{renderTitle}
						<CoText>{t('misc.txt.loading')}</CoText>
					</ContentContainer>
				</ContentWrapper>
			</Base>
		)
	}

	if (error) {
		return (
			<Base {...props} centered={centered}>
				<ContentWrapper centered='both'>
					<ContentContainer
						alignItems='center'
						gap='$gapMd'
						justifyContent='center'
						narrow='small'
					>
						{renderTitle}
						{typeof error === 'string' ? (
							<CoText>{error}</CoText>
						) : (
							<CoText>{t('misc.err.something_went_wrong')}</CoText>
						)}
					</ContentContainer>
				</ContentWrapper>
			</Base>
		)
	}

	return (
		<ScrollView>
			<Base {...props} centered={centered}>
				<ContentWrapper centered={centered}>
					<ContentContainer narrow={narrow ?? 'big'}>
						{renderTitle}
						{children}
					</ContentContainer>
				</ContentWrapper>
			</Base>
		</ScrollView>
	)
}

type CoPageProps = BaseProps & {
	error?: string | boolean
	isLoading?: boolean
	narrow?: 'big' | 'none' | 'small'
	title?: string
	centered?: 'both' | 'horizontal' | 'none' | 'vertical'
}

const Base = styled(View, {
	name: 'CoPage',

	backgroundColor: '$surface',
	display: 'flex',
	flexDirection: 'column',
	minHeight: '100%',
	paddingBottom: DEFAULT_BOTTOM_FREE_SPACE,
	paddingHorizontal: '$spacingXs',
	$gtMd: {
		paddingHorizontal: '$spacingSm',
	},
	variants: {
		centered: {
			both: { justifyContent: 'center', alignItems: 'center' },
			horizontal: { alignItems: 'center' },
			none: {},
			vertical: { justifyContent: 'center' },
		},
	} as const,
	defaultVariants: {
		centered: 'horizontal',
	},
})
type BaseProps = GetProps<typeof Base>

const ContentWrapper = styled(YStack, {
	name: 'CoPage-ContentWrapper',

	flex: 1,
	width: '100%',
	variants: {
		centered: {
			both: { justifyContent: 'center', alignItems: 'center' },
			horizontal: { alignItems: 'center' },
			none: {},
			vertical: { justifyContent: 'center' },
		},
	} as const,
	defaultVariants: {
		centered: 'horizontal',
	},
})

const ContentContainer = styled(YStack, {
	name: 'CoPage-ContentContainer',

	width: '100%',
	variants: {
		narrow: {
			big: {
				maxWidth: '$page.widthMaxSm',
				$gtXs: { maxWidth: '$page.widthMaxMd' },
				$gtXl: { maxWidth: '$page.widthMaxLg' },
			},
			none: {
				maxWidth: '100%',
			},
			small: {
				maxWidth: '$page.widthMaxXxs',
				$gtXs: { maxWidth: '$page.widthMaxXs' },
				$gtXl: { maxWidth: '$page.widthMaxMd' },
			},
		},
	} as const,
	defaultVariants: {
		narrow: 'big',
	},
})
