<template>
  <client-only>
    <div class="container mx-auto">
      <client-only>
        <slot />
      </client-only>
    </div>
    <template #fallback>
      <client-only>
        <section class="flex w-full content-center items-center min-h-screen">
          <p class="text-white text-center">
            Loading Page
          </p>
        </section>
      </client-only>
    </template>
  </client-only>
</template>
