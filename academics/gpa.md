<script setup lang="ts">
    import { ref, computed } from "vue";
    import katex from 'katex';
    import 'katex/dist/katex.min.css';

    const sgpaGrades = ref(['', '', '', '', '']);
    const sgpaCredits = ref([0, 0, 0, 0, 0]);

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
        sgpaGrades.value.push('');
        sgpaCredits.value.push(0);
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

</script>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }
    div.special {
        width: 100%;
        display: flex;
        justify-content: right;
    }
    th {
        background-color: #f0f0f0;
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }
    td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
        background-color: #1B1B1F;
    }
</style>

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
<table>
    <tr>
        <th style="width: 10%;"></th>
        <th style="width: 30%;">Grade</th>
        <th style="width: 30%;">Credits</th>
        <th style="width: 30%;">Grade Points</th>
    </tr>
    <tr v-for="(data,index) in sgpaGrades" :key="index">
        <td>
            <button @click="() => deleteSubject(index)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            </button>
        </td>
        <td style="text-align: center;">
            <select v-model="sgpaGrades[index]" style="width: 100%; margin: auto; padding: 1px 5px; text-align: center; background-color: transparent;">
                <option value="">Select grade</option>
                <option value="S">S</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
            </select>
        </td>
        <td style="display: flex; justify-content: center; align-items: center;">
            <button @click="sgpaCredits[index] = (sgpaCredits[index] > 0) ? sgpaCredits[index] - 1 : sgpaCredits[index]" style="padding: 2px; background-color: #161618; border-radius: 5px; width: 3rem; height: 2rem; font-size: 18px;">-</button>
            <input v-model="sgpaCredits[index]" type="number" min="0" max="10" style="width: 100%; margin: auto; padding: 1px 5px; text-align: center; background-color: transparent; font-size: 14px;" />
            <button @click="sgpaCredits[index] = (sgpaCredits[index] < 10) ? sgpaCredits[index] + 1 : sgpaCredits[index]" style="padding: 2px; background-color: #161618; border-radius: 5px; width: 3rem; height: 2rem; font-size: 18px;">+</button>
        </td>
        <td>{{ sgpaGradePoints[index] }}</td>
    </tr>
</table>
<div class="special">
    <button :style="{ backgroundColor: '#3E63DD', borderRadius: '5px', padding: '2px 7px', color: 'white' }" @click="addSubject">+ Add Subject</button>&nbsp;
</div>
<br />

<div v-if="!sgpaCredits.includes(0)" v-html="sgpa"></div>
<div v-else>Wait...</div>
