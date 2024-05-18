<script setup lang="ts">
    import { ref, computed } from "vue";
    import { useData } from 'vitepress';

    const { isDark } = useData();

    const srn = ref("");
    const prn = ref("");

    const isValidSRN = computed(() => srn.value.match(/PES[12][UP]G\d{2}(?:AM|CS|EE|EC|ME|BT|CV)\d{3}/));
    const isValidPRN = computed(() => prn.value.match(/PES[12]20\d{2}\d{5}/));

    const srnParse = computed(() => {
        const srnDetails = srn.value.match(/(PES)([12])([UP]G)(\d{2})(AM|CS|EE|EC|ME|BT|CV)(\d{3})/);
        return {
            pes: [ srnDetails[1], "PES University" ],
            campus: [ srnDetails[2], srnDetails[2] === "1" ? "RR Campus" : "EC Campus" ],
            graduate: [ srnDetails[3], srnDetails[3] === "UG" ? "Undergraduate" : "Postgraduate" ],
            year: [ srnDetails[4], "20" + srnDetails[4] + " batch" ],
            dept: [ srnDetails[5], "Department of " + {
                "AM": "Computer Science Engineering (Artificial Intelligence & Machine Learning)",
                "CS": "Computer Science Engineering",
                "EC": "Electronics and Communication Engineering",
                "EE": "Electrical and Electronics Engineering",
                "ME": "Mechanical Engineering",
                "BT": "Biotechnology",
                "CV": "Civil Engineering"
            }[srnDetails[5]] ],
            id: [ srnDetails[6], "Serial number" ]
        }
    });

    const prnParse = computed(() => {
        const prnDetails = prn.value.match(/(PES)([12])(20\d{2})(\d{5})/);
        return {
            pes: [ prnDetails[1], "PES University" ],
            campus: [ prnDetails[2], prnDetails[2] === "1" ? "RR Campus" : "EC Campus" ],
            year: [ prnDetails[3], prnDetails[3] + " batch" ],
            id: [ prnDetails[4], "Serial number" ]
        }
    });
</script>

# The PRN and SRN
PRN and SRN are two unique IDs that are provided to you.


## PRN
* Short for **Personal Registration Number**
* The PRN format is `PESxyyyyzzzzz`, where `x` is your campus code (1 is RR, 2 is EC), `yyyy` is the year of admission, and `zzzzz` is a unique number.

Try entering your PRN here and see what it means, or use the example PRN.

**Enter your PRN:**&emsp;
<input :style="{ backgroundColor: isDark ? '#161618' : '#EBEBEF', borderRadius: '5px', padding: '2px' }" v-model="prn" />&emsp;
<button :style="{ backgroundColor: '#3E63DD', borderRadius: '5px', padding: '2px 7px', color: 'white' }" @click="prn = 'PES1202101234'">Example PRN</button>&nbsp;
<button :style="{ backgroundColor: '#32363F', borderRadius: '5px', padding: '2px 7px', color: 'white' }" @click="prn = ''">Reset</button>&nbsp;

<p v-if="isValidPRN">
    <ul v-for="field in prnParse">
        <li><code>{{ field[0] }}</code> : {{ field[1] }}</li>
    </ul>
</p>
<span v-else style="color: red;">
    Invalid PRN
</span>


## SRN
* Short for **Student Registration Number**
* The SRN format is `PESxzzyyccnnn`, where `x` is campus code, `zz` specifies your general qualification (UG for undergraduate), `yy` for year of admission, `cc` is course code (CS, EC, EE, AM, ME etc) and `nn` is a unique number.

Try entering your SRN here and see what it means, or use the example SRN.

**Enter your SRN:**&emsp;
<input :style="{ backgroundColor: isDark ? '#161618' : '#EBEBEF', borderRadius: '5px', padding: '2px' }" v-model="srn" />&emsp;
<button :style="{ backgroundColor: '#3E63DD', borderRadius: '5px', padding: '2px 7px', color: 'white' }" @click="srn = 'PES1UG23CS123'">Example SRN</button>&nbsp;
<button :style="{ backgroundColor: '#32363F', borderRadius: '5px', padding: '2px 7px', color: 'white' }" @click="srn = ''">Reset</button>&nbsp;

<p v-if="isValidSRN">
    <ul v-for="field in srnParse">
        <li><code>{{ field[0] }}</code> : {{ field[1] }}</li>
    </ul>
</p>
<span v-else style="color: red;">
    Invalid SRN
</span>
