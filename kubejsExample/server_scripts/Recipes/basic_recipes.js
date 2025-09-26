//If you need more information you can check the wiki
//https://wikis.degrassi.es/docs/modular-machinery-reborn

/*
1 second = 20 ticks
1 Bucket (like a water bucket) = 1000 mB

What if we want to add a recipe for our multiblock?
Easy, just as the follow

You can do the following (inputs):

- requireItem -> Needs that item to make the recipe to run, can have nbt data

- requireFluid -> in mB, not Buckets
- requireFluidPerTick -> in mB, it say that the recipe will use X amount of mB each tick, like lubricant on a motor

- requireEnergy -> In total, before starting the recipe
- requireEnergyPerTick -> As the name say, every tick, it will produce that amount

- requireExperience -> In XP points (it will converted to levels in the recipe viewer)
- requireExperiencePerTick -> In XP points, it will generate that amount each tick

- requireChemical -> In mB, not Buckets (needs Modular Machinery Reborn Mekanism addon)
- requireKinetic -> In SU (needs Modular Machinery Reborn Create addon)
- requireSource -> In source (needs Modular Machinery Reborn Ars addon)

You can do the following (outputs):

- produceItem -> Produce the item, can have nbt data

- produceFluid -> in mB, not Buckets
- produceFluidPerTick -> in mB, it says that the recipe will produce that amount each tick

- produceEnergy -> In total, after the recipe
- produceEnergyPerTick -> Per tick, it will produce that amount while the recipe is running

- produceExperience -> In XP points (it will converted to levels in the recipe viewer)
- produceExperiencePerTick -> In XP point, it will produce that much each tick

- produceChemical -> In mB, not Buckets (needs Modular Machinery Reborn Mekanism addon)
- produceKinetic -> In SU (needs Modular Machinery Reborn Create addon)
- produceSource -> In source (needs Modular Machinery Reborn Ars addon)

*/
ServerEvents.recipes(event => {
    const time = 20 //in ticks (20 ticks = 1 second)
    const machine_id = "mmr:lcr6"
    event.recipes.modular_machinery_reborn.machine_recipe(machine_id, time)
    .requireItem("minecraft:acacia_boat")
    .produceItem("minecraft:oak_log")
})

/*
But the items are overlapping each other, how can we solve it?
Well, require and produce has optional arguments that you can pass

If 1 argument is passed -> Item you specified with 100% and position 0,0
If 2 arguments are passed -> Item you specified with Z% and position 0,0
If 3 arguments are passed -> Item you specified with 100% and position X,Y
If 4 arguments are passed -> Item you specified with Z% and position X,Y


Where Z is the chance (Z*100 to get it in %) in a range of 0.0 to 1.0 and X and Y are whole numbers 
Item then chance then X and finally Y, in that order
*/
ServerEvents.recipes(event => {
    const time = 20 //in ticks (20 ticks = 1 second)
    const machine_id = "mmr:lcr6"
    event.recipes.modular_machinery_reborn.machine_recipe(machine_id, time)
    .requireItem("minecraft:spruce_boat", 10, 10)
    .produceItem("minecraft:oak_log", 0.1, 40, 10) //has a 1% to be produce
})

/*
But the arrow isnt centered too...
Well, you have progressX and progressY where you can put a whole number
and customize where the arrow is

Or disable it
*/
ServerEvents.recipes(event => {
    const time = 20 //in ticks (20 ticks = 1 second)
    const machine_id = "mmr:lcr6"
    event.recipes.modular_machinery_reborn.machine_recipe(machine_id, time)
    .progressX(20)
    .progressY(20)
    .requireItem("minecraft:cherry_boat", 10, 10)
    .produceItem("minecraft:oak_log", 40, 10)

    event.recipes.modular_machinery_reborn.machine_recipe(machine_id, time)
    //.progressX(20)
    //.progressY(20)
    .renderProgress(false) //or you can disable it
    .requireItem("minecraft:oak_boat", 10, 10)
    .produceItem("minecraft:oak_log", 40, 10)
})

/*
You can also customize the size of the recipe viewer tab

By default, it's 256, 256
*/

ServerEvents.recipes(event => {
    const time = 20 //in ticks (20 ticks = 1 second)
    const machine_id = "mmr:lcr6"
    event.recipes.modular_machinery_reborn.machine_recipe(machine_id, time)
    .width(110)
    .height(60)
    .requireItem("minecraft:jungle_boat", 10, 10)
    .produceItem("minecraft:oak_log", 40, 10)
})
