<template>
    <client-only>
        <div class="container mx-auto">
          <client-only>
            <slot></slot>
          </client-only>
        </div>
      <template v-slot:fallback>
        <!-- this will be rendered on server side -->
        <p>Loading comments...</p>
      </template>
    </client-only>
</template>