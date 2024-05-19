<script setup lang="ts">
    import { ref, computed } from "vue";
    import { useData } from "vitepress";
    import katex from 'katex';
    import 'katex/dist/katex.min.css';

    const { isDark } = useData();

    const sgpaGradesBG = ref([6, 6, 6, 6, 6]);
    const sgpaGrades = computed(() => {
        return sgpaGradesBG.value.map(x => grades[x]);
    })
    const sgpaCredits = ref([0, 0, 0, 0, 0]);

    const grades = [ "F", "E", "D", "C", "B", "A", "S" ];

    const sgpaGradePoints = computed(() => {
        const mapping = {
            "S": 10,
            "A": 9,
            "B": 8,
            "C": 7,
            "D": 6,
            "E": 5,
            "F": 4,
        };
        return sgpaGrades.value.map(x => x in mapping ? mapping[x] : 0);
    });

    function addSubject()   {
        sgpaGrades.value.push('S');
        sgpaCredits.value.push(6);
    }

    function deleteSubject(index: number)   {
        sgpaGrades.value.splice(index, 1);
        sgpaCredits.value.splice(index, 1);
    }

    const sgpa = computed(() => {
        let sumOfGrades = 0;
        let sumOfCredits = 0;
        for (let i = 0; i < sgpaGrades.value.length; i++) {
            sumOfGrades += sgpaCredits.value[i] * sgpaGradePoints.value[i];
            sumOfCredits += sgpaCredits.value[i];
        }

        // let str = `SGPA = \\dfrac{`;

        // for (let i = 0; i < 5; i++)
        //     str += `(${sgpaCredits.value[i]} \\times ${sgpaGradePoints.value[i]})${i < 4 ? " + " : ""}`;

        // str += `}{`;

        // for (let i = 0; i < 5; i++)
        //     str += `${sgpaCredits.value[i]}${i < 4 ? " + " : ""}`;

        // str += `} \\newline 
        // SGPA = ${(sumOfGrades / sumOfCredits).toFixed(2)}`

        return katex.renderToString(`SGPA = \\boxed{${(sumOfGrades / sumOfCredits).toFixed(2)}}`, {
            throwOnError: false,
        });
    });

    /**
     * CGPA Calculation
     */

    const cgpaGrades = ref([0, 0, 0, 0, 0, 0, 0, 0]);
    const cgpaCredits = ref([0, 0, 0, 0, 0, 0, 0, 0]);

    const cgpa = computed(() => {
        let sumOfGrades = 0;
        let sumOfCredits = 0;
        for (let i = 0; i < cgpaGrades.value.length; i++) {
            sumOfGrades += cgpaCredits.value[i] * cgpaGrades.value[i];
            sumOfCredits += cgpaCredits.value[i];
        }

        return katex.renderToString(`CGPA = \\boxed{${(sumOfGrades / sumOfCredits).toFixed(2)}}`, {
            throwOnError: false,
        });
    });

</script>


# The GPA System

## Credits
To obtain your degree, you need to gain a certain number of credits across the 4 years of study here, which was `160` when last calculated. If you don't get 160 by the time graduation arrives, you simply won't be given your degree.These 160 credits are then distributed among courses. You would have noticed that some courses will have 5, 4 or 2 credits.

Each course will have a certain credits required, which will be awarded once you pass the course. Which means as long as you get above an F grade, you will pass the course and get those credits at the end of that semester. You either pass and get the full number of credits in that course, or you fail and you get 0, there is no partial credit. Since there is no concept of "failing a year", you can essentially fail all your courses in a year and still move on to the next year, but you would not have earned any credits. Credits are essentially weights for a course that determine how important they are. For example, a 4 credit course will have 4 hours of classes in a week, a 2 credit course will have 2 hours of classes in a week and so on.


## Coursework & Internship Credits
Some courses are mandatory, meaning you will have to pass them and get those credits while some of them (electives and special topics) aren't. If you withdraw from a course you'll need to make up for credits. You cannot skip out on mandatory courses.

Credits are also obtained via internships pursued at the end of 3rd year and in 8th semester. The details of how this conversion is made aren't relevant to your question so skipping it for now. Additionally, you can also take up some extra courses beyond the official curriculum to add credits. Note that there is no concept of early graduation at PES, so even if you finish BTech a year early they'll make you stay so there is no advantage from a time or financial point or view.


## Calculating your GPA
Your final marks for a course is a combination of ISA + ESA + assignments + project + etc combined in some weighted fashion. Now marks are mapped to Grades with 90+ being S, 80-89 being A, 70-79 being B and so on. Grades are then assigned numbers with S grade = 10, A = 9 and so on.


## Relative Grading?
No, PESU does not follow any relative grading. There is a fixed formula used to calculate your GPAs. However, sometimes, when a batch performs poorly in a course they will shift the marks-to-grade mappings (so maybe instead of 90+ being an S they shift it to 85+). This isn't the accurate definition of *relative*, and additionally we do not know how they *determine the magnitude of the shift* so it's not a transparent process.

## Formulas
SGPA is a weighted average of grades in a semester where the weights are the credits for that course. So,
$$ SGPA = \dfrac{\sum (credits_{course} \times grade_{course})}{\sum credits_{course}} $$

CGPA is again a weighted average of your SGPA, where the weights are the credits in that semester. So,
$$ CGPA = \dfrac{\sum (credits_{sem} \times sgpa_{sem})}{\sum credits_{all\_sems}} $$


## SGPA Calculator
<table class="w-full">
    <tr class="w-full">
        <th class="text-center"></th>
        <th class="text-center">Grade</th>
        <th class="text-center">Credits</th>
        <th class="text-center">Grade Points</th>
    </tr>
    <tr v-for="(data,index) in sgpaGrades" :key="index" class="w-full">
        <td :style="{ backgroundColor: (isDark ? '#1B1B1F' : 'white') }">
            <button @click="() => deleteSubject(index)" class="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2 w-5 h-5"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            </button>
        </td>
        <td :style="{ backgroundColor: isDark ? '#1B1B1F' : 'white' }" class="w-1/2">
            <div style="display: flex; justify-content: center; align-items: center; width: 100%;">
                <button @click="sgpaGradesBG[index] = (sgpaGradesBG[index] > 0) ? sgpaGradesBG[index] - 1 : sgpaGradesBG[index]" style="padding: 2px; background-color: #161618; border-radius: 5px; width: 3rem; height: 2rem; font-size: 18px;">-</button>
                <span style="width: 100%; margin: auto; text-align: center; background-color: transparent;">{{ sgpaGrades[index] }}</span>
                <button @click="sgpaGradesBG[index] = (sgpaGradesBG[index] < 6) ? sgpaGradesBG[index] + 1 : sgpaGradesBG[index]" style="padding: 2px; background-color: #161618; border-radius: 5px; width: 3rem; height: 2rem; font-size: 18px;">+</button>
            </div>
        </td>
        <td :style="{ backgroundColor: isDark ? '#1B1B1F' : 'white' }" class="w-full">
            <div style="display: flex; justify-content: center; align-items: center; width: 100%;">
                <button @click="sgpaCredits[index] = (sgpaCredits[index] > 0) ? sgpaCredits[index] - 1 : sgpaCredits[index]" style="padding: 2px; background-color: #161618; border-radius: 5px; width: 3rem; height: 2rem; font-size: 18px;">-</button>
                <span style="width: 100%; margin: auto; text-align: center; background-color: transparent;">{{ sgpaCredits[index] }}</span>
                <button @click="sgpaCredits[index] = (sgpaCredits[index] < 10) ? sgpaCredits[index] + 1 : sgpaCredits[index]" style="padding: 2px; background-color: #161618; border-radius: 5px; width: 3rem; height: 2rem; font-size: 18px;">+</button>
            </div>
        </td>
        <td :style="{ backgroundColor: isDark ? '#1B1B1F' : 'white' }" class="w-full">{{ sgpaGradePoints[index] }}</td>
    </tr>
</table>

<div class="flex justify-end">
    <button class="bg-[#3E63DD] rounded-md px-5 py-1 text-white" @click="addSubject">+ Add Subject</button>&nbsp;
</div>
<br />

<div v-if="!sgpaCredits.includes(0)" v-html="sgpa" class="text-xl"></div>
<div v-else class="text-red-500">Please enter all details</div>


## CGPA Calculator
<table class="w-full">
    <tr class="w-full">
        <th class="text-center">Sem</th>
        <th class="text-center">SGPA</th>
        <th class="text-center">Credits</th>
    </tr>
    <tr v-for="(data,index) in cgpaGrades" :key="index" class="w-full">
        <td :style="{ backgroundColor: (isDark ? '#1B1B1F' : 'white') }">
            {{ index + 1 }}
        </td>
        <td :style="{ backgroundColor: isDark ? '#1B1B1F' : 'white' }" class="w-1/2">
            <div class="w-full flex flex-row items-center justify-center">
                <input type="number" min="0.0" max="10.0" step="0.1" class="w-1/4 border text-center text-lg" v-model="cgpaGrades[index]" />
            </div>
        </td>
        <td :style="{ backgroundColor: isDark ? '#1B1B1F' : 'white' }" class="w-full">
            <div style="display: flex; justify-content: center; align-items: center; width: 100%;">
                <input type="number" class="w-1/4 border text-center text-lg" v-model="cgpaCredits[index]" />
            </div>
        </td>
    </tr>
</table>
<br />

<div v-if="cgpaCredits.some(x => x !== 0)" v-html="cgpa" class="text-xl"></div>
<div v-else class="text-red-500">Please enter all details</div>