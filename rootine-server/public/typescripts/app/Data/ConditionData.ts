namespace Rootine
{
    /**
     * 現在受けている注文のデータを格納するクラス
     */
    class ConditionData
    {
        /**
         * 現在選択中の整理券番号
         */
        public currentReservation:number = 1;

        /**
         * 現在の整理券番号のリセット回数
         */
        public currentReset:number = 0;

        /**
         * 現在の来客数（整理券番号の通りでカウント）
         */
        public currentCustomerCount:number = 0;

        /**
         * 現在の日程
         */
        public currentDay = 1;

        public constructor(currentReservation:number,currentReset:number,currentCustomerCount:number,currentDay:number)
        {
            this.currentReservation = currentReservation;
            this.currentReset = currentReset;
            this.currentCustomerCount = currentCustomerCount;
            this.currentDay = currentDay;
        }
    }
}
