<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import { Slider } from "$lib/components/ui/slider/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import * as Collapsible from "$lib/components/ui/collapsible/index";
    import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
    import { submissionSchema, localStorageSchema } from "$lib/models";
    import { browser } from "$app/environment";

    let channelName = $state("");
    let targetLength = $state(270);
    let includeAts = $state(false);
    let usersName = $state("");
    let ignoreMods = $state(true);
    let ignoreVips = $state(true);

    let lengthInfoOpen = $state(false);

    let pending = $state(false);
    function handleGo() {
        if (pending) return;
        pending = true;
        if (browser) {
            localStorage.setItem(
                "storedInputs",
                JSON.stringify({
                    channelName,
                    usersName,
                    timestamp: Date.now(),
                }),
            );
        }
    }

    $effect(() => {
        if (browser) {
            const storedInputs = localStorage.getItem("storedInputs");
            try {
                const parsedInputs = localStorageSchema.parse(storedInputs);

                if (parsedInputs.channelName)
                    channelName = parsedInputs.channelName;
                if (parsedInputs.usersName) usersName = parsedInputs.usersName;
            } catch (e) {
                // failed to parse whatever was stored so just leave it blank
            }
        }
    });
</script>

<div class="h-screen">
    <div class="flex flex-row gap-4 justify-center items-center">
        <h1
            class="text-2xl [writing-mode:sideways-lr]"
            style={`letter-spacing: ${targetLength / 400 + 0.2}em;`}
        >
            tinger
        </h1>
        <div class="flex flex-col gap-4 justify-center items-center h-screen">
            <Input
                placeholder="channel name..."
                class="w-1/2"
                bind:value={channelName}
            />
            <Label class="text-xs"
                >target msg length {targetLength}<Button
                    variant="ghost"
                    size="icon"
                    onclick={() => (lengthInfoOpen = true)}
                    aria-label="message length information dialog button"
                >
                    ?
                </Button></Label
            >
            <Slider
                type="single"
                class="w-1/2"
                bind:value={targetLength}
                max={500}
                min={100}
                step={5}
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
            <Collapsible.Root class="w-85 space-y-2">
                <div class="flex items-center justify-between space-x-4 px-17 ">
                    <h4 class="text-sm">advanced options</h4>
                    <Collapsible.Trigger
                        class={buttonVariants({
                            variant: "ghost",
                            size: "sm",
                            class: "w-9 p-0",
                        })}
                    >
                        <ChevronsUpDownIcon />
                        <span class="sr-only">Toggle</span>
                    </Collapsible.Trigger>
                </div>
                <Collapsible.Content class="w-3/4 mx-auto">
                    <Input
                        placeholder="your name..."
                        class="mb-1 w-3/4 mx-auto"
                        bind:value={usersName}
                    />
                    <Label
                        class="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-green-600 has-aria-checked:bg-green-50 dark:has-aria-checked:border-green-900 dark:has-aria-checked:bg-green-950 mb-1"
                    >
                        <Checkbox
                            id="toggle-2"
                            checked={ignoreMods}
                            class="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-foreground dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                        />
                        <div class="grid gap-1.5 font-normal">
                            <p class="text-xs leading-none font-medium">
                                ignore channel mods
                            </p>
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
                            <p class="text-xs leading-none font-medium">
                                ignore channel VIPs
                            </p>
                        </div>
                    </Label>
                </Collapsible.Content>
            </Collapsible.Root>
            <Button onclick={handleGo} class="ml-4" disabled={pending}>{pending ? "going..." : "go"}</Button>
        </div>
    </div>
</div>

<Dialog.Root bind:open={lengthInfoOpen}>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>target msg length</Dialog.Title>
            <Dialog.Description>
                when generating messages, tinger will aim to stop around this
                length. the default is 270 characters due to moderation bots
                commonly imposing limits around 300 characters (e.g. in xqc's
                chat).
            </Dialog.Description>
        </Dialog.Header>
    </Dialog.Content>
</Dialog.Root>
