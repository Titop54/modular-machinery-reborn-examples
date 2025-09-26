//If you need more information you can check the wiki
//https://wikis.degrassi.es/docs/modular-machinery-reborn

/*
Functions are a way to change recipes on demand instead of hardcoding them
There are 4 Functions:

.requireFunctionToStart("id") -> Decides if you can start a recipe
.requireFunctionOnStart("id") -> Useful to check items to give a boost
.requireFunctionEachTick("id") -> When you want to check item to modify recipe time or stop it
.requireFunctionOnEnd("id") -> Decides if you get a result or not

Or if you like, you can send data to any function adding an optional argument, an array of text:

.requireFunctionToStart("id", ["hello", "im", "inside", "the boat"])
.requireFunctionOnEachTick("boat_chooser", "hello", "im", "inside", "the boat")

Or if you prefer to send an object, for example, an array with all the data,
you can send it as a string with the global JSON:

data = JSON.stringify({
    hello: "in a boat"
})

And to get back the object, you can use:

object_inside = JSON.parse(data[i]), where i is the index in the array of string you've sent



You can also send data to the functions in 2 other ways:

- Using global variables, like IOType, which you can access anywhere in this file

let magic_number = 42
ServerEvents.recipes(event => {
    let mul = magic_number * 50
    console.log(mul)
}

- Using kubejs global https://kubejs.com/wiki/global-scope
ServerEvents.recipes(event => {
    let info = global.information //global.information needs to be defined in the startup folder
    console.log(info)
}
    //on a .js on the startup_scripts folder
    global.information = "hola"

*/
let IOType = Java.loadClass("es.degrassi.mmreborn.common.machine.IOType");

ServerEvents.recipes(event => {
    global.text = 0; //needs to setup on the startup_scripts folder first!!!
    const time = 20 //in ticks (20 ticks = 1 second)
    const machine_id = "mmr:lcr6"
    event.recipes.modular_machinery_reborn.machine_recipe(machine_id, time)
    .progressX(54)
    .progressY(20)
    .width(110)
    .height(60)
    .requireEnergy(10000, 0, 4)
    .requireItem("minecraft:birch_boat")
    .produceItem("minecraft:oak_log")
    .requireFunctionOnEachTick("boat_chooser") //not passing arguments
    .requireFunctionOnEnd("boat_chooser", ["hello"]) //passing arguments, in this case "hello"
})

/*
For more advanced users, you can check all methods here: 
https://github.com/alec016/modular-machinery-reborn/blob/1.21-NeoForge/src/main/java/es/degrassi/mmreborn/common/integration/kubejs/function/MachineControllerJS.java

For less advanced users (and more advanced users), 
you can use probejs during development to get all methods that controller has
*/
MMREvents.recipeFunction("boat_chooser", event => {
    let controller = event.machine; //This has more useful functions, more can be found here https://wikis.degrassi.es/docs/modular-machinery-reborn/section/creating-a-new-recipe/article/machine
    
    let level = event.getTile().getLevel(); //Allows to get to the Level class, useful to do commands or more
    let pos = event.getTile().getBlockPos(); //Controller position
    let speed = event.baseSpeed; //speed of the recipe
    let time_remaining = event.remainingTime; //Time remaining for the recipe
    event.setBaseSpeed(2) //min is 0.1

    let data = event.getContext().args //to get the data passed
    let size_data = event.getContext().args.size()
    //or you can go brute force (not recommended, unless you have problems with the above)
    try
    {
        //ofc, you will limit the maximum because of lag reason
        //100 or 10 will be more than enough in most cases
        for(let i = 0; i < 10/*2147483647*/; i++)
        {
            data[i] = event.get(i)
        }
    }
    catch(error) //this says, that we have no more data, you can ignore it
    {}
    

    let inputItems = controller.getItemsStored(IOType.INPUT); //Get a list with all items
    let outputItems = controller.getItemsStored(IOType.OUTPUT);

    let inputFluids = controller.getFluidsStored(IOType.INPUT); //Get a list with all fluids
    let outputFluids = controller.getFluidsStored(IOType.OUTPUT);

    let inputEnergy = controller.getEnergyStored(IOType.INPUT); //Get how much energy is stored
    let outputEnergy = controller.getEnergyStored(IOType.OUTPUT);
    let capacity = controller.getEnergyCapacity(IOType.OUTPUT);//gets the maximum capacity, not the same
    controller.setPaused(true) //To pause the recipe
    
    //if you want to specify an error, use event.error("Text here")
    //If not, dont specify something
})