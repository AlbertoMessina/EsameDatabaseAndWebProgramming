<!-- The Modal -->
<div id="{{ $modalId }}" class="modal ">

  <!-- Modal content -->
  <div class="modal-content {{$modalClass}}" >
    <div class="modal-header modal-header-text">

      <label class="modal-title font-weight-bold">{{ $modalTitle }}</label>
      <span class="close" onclick="closeModal(this)">&times;</span>
    </div>
    <div class="modal-body">
      {{ $slot }}
    </div>

  </div>

</div>