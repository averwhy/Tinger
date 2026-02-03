<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Slider } from "$lib/components/ui/slider/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";

    let targetLength = $state(200);
    let includeAts = $state(false);
    let ignoreMods = $state(true);
    let ignoreVips = $state(true);
</script>

<div class="h-screen">
    <div class="flex flex-row gap-4 justify-center items-center">
        <h1
            class="text-2xl [writing-mode:sideways-lr]"
            style={`letter-spacing: ${targetLength / 1000}em;`}
        >
            tinger
        </h1>
        <div class="flex flex-col gap-4 justify-center items-center h-screen">
            <Input placeholder="channel name..." class="ml-4 w-xs" />
            <Label class="text-xs">target msg length {targetLength}</Label>
            <Slider
                type="single"
                bind:value={targetLength}
                max={500}
                min={100}
                step={1}
            />
            <Label
                class="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-green-600 has-aria-checked:bg-green-50 dark:has-aria-checked:border-green-900 dark:has-aria-checked:bg-green-950"
            >
                <Checkbox
                    id="toggle-2"
                    checked={includeAts}
                    class="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-foreground dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                />
                <div class="grid gap-1.5 font-normal">
                    <p class="text-xs leading-none font-medium">include @'s</p>
                </div>
            </Label>
            <Label
                class="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-green-600 has-aria-checked:bg-green-50 dark:has-aria-checked:border-green-900 dark:has-aria-checked:bg-green-950"
            >
                <Checkbox
                    id="toggle-2"
                    checked
                    class="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-foreground dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                />
                <div class="grid gap-1.5 font-normal">
                    <p class="text-xs leading-none font-medium">ignore channel mods</p>
                </div>
            </Label>
            <Label
                class="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-green-600 has-aria-checked:bg-green-50 dark:has-aria-checked:border-green-900 dark:has-aria-checked:bg-green-950"
            >
                <Checkbox
                    id="toggle-3"
                    checked={ignoreVips}
                    class="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-foreground dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                />
                <div class="grid gap-1.5 font-normal">
                    <p class="text-xs leading-none font-medium">ignore channel VIPs</p>
                </div>
            </Label>
            <Button class="ml-4">go</Button>
        </div>
    </div>
</div>
