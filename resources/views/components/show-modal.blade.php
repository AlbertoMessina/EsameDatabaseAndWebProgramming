<!-- The Modal -->
<div  id="{{ $modalId }}" class="modal ">

  <!-- Modal content -->
  <div class="modal-content show-modal">
    <div class="modal-header modal-header-text">
      <label class="modal-title show-left-title font-weight-bold">{{ $modalTitle }}</label>
      <label class="modal-title show-right-title ">{{$rightTitle}} </label>           
      <span class="close" onclick="closeModal(this)">&times;</span>
    </div>
    <div class="modal-body">
      {{ $slot }} 
    </div>

  </div>

</div>
  