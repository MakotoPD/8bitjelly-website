<template>
	<div>

		<Head>
			<Title>8BitJelly - {{ $t('page.terms.title') }}</Title>
		</Head>

        <Menu />


		<div class="container mx-auto md:mt-24  mb-24 md:mb-0 px-8 min-h-screen">
			
			<h1 class="text-xl font-semibold ">{{ $t('page.terms.sub') }}</h1>

			<p class="py-8">

				<ul class="list-decimal pb-4">
					<li>
						{{ $t('page.terms.1') }}
					</li>
					<li>
						{{ $t('page.terms.2') }}
					</li>
					<li>
						{{ $t('page.terms.3') }}
					</li>
					<li>
						{{ $t('page.terms.4') }}
					</li>
					<li>
						{{ $t('page.terms.5') }}
					</li>
					<li>
						{{ $t('page.terms.6') }}
					</li>
					<li>
						{{ $t('page.terms.7') }}
					</li>
				</ul>

				{{ $t('page.terms.end') }}

			</p>

		</div>


		<Foter/>
	</div>
</template>