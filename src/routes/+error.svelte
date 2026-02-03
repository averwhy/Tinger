<script>
    import { page } from "$app/state";

</script>
<div class="h-screen">
    <div class="flex flex-col gap-4 justify-center items-center h-screen">
        <h1 class="text-2xl">tinger</h1>
        <p class="text-center">error - {page.status}</p>
    </div>
</div>