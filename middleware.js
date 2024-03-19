{
    let getPackageName = null
    {
        let cachedPackageName = null;
        getPackageName = function () {
            if (cachedPackageName !== null) {
                return cachedPackageName;
            }
            const fopenAddr = Module.findExportByName(null, "fopen");
            const fopen = new NativeFunction(fopenAddr, "pointer", ["pointer", "pointer"]);
            const FILE = fopen(Memory.allocUtf8String("/proc/self/cmdline"), Memory.allocUtf8String("r"));
            if (!FILE) {
                return "Error";
            }
            const fgetsAddr = Module.findExportByName(null, "fgets");
            const fgets = new NativeFunction(fgetsAddr, "int32", ["pointer", "int32", "pointer"]);
            const buffer = Memory.alloc(255);
            fgets(buffer, 255, FILE);
            const fcloseAddr = Module.findExportByName(null, "fclose");
            const fclose = new NativeFunction(fcloseAddr, "int32", ["pointer"]);
            fclose(FILE);

            // Cache in memory
            cachedPackageName = buffer.readCString();
            return cachedPackageName;
        }
    }


    if (true) {//) {
        const pkg = getPackageName()
        Java.perform(function () {
            Java.scheduleOnMainThread(function () {
                var toast = Java.use("android.widget.Toast");
                const pkg = getPackageName()
                toast.makeText(Java.use("android.app.ActivityThread").currentApplication().getApplicationContext(), Java.use("java.lang.String").$new(pkg), 1).show();
            });
        });
    }

}
